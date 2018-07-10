import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import sortBy from 'sort-by'

class SearchBooks extends Component {

  state = {
    query: '',
    results: []
  }

  setInitialState = () => {
    console.log('resetting state')
    this.setState(() => ({
      query: '',
      results: []
    }))
  }

  renderResults = (queryResults) => (
    queryResults.map((book) => (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">

            {/*Because if there is no image, it bombs*/}
            {!book.imageLinks && (
              <div className="book-cover" 
                  style={{ width: 128, height: 193}}></div>
            )}
            {book.imageLinks && (
              <div className="book-cover" 
                  style={{ width: 128, height: 193, 
                  backgroundImage: 'url(' + book.imageLinks.thumbnail + ')'}}></div>
            )}
            {//TODO: The option "None" should be selected if a book has not been assigned to a shelf.
            }
            <div className="book-shelf-changer">
              <select
                value={book.shelf ? book.shelf : 'none'}
                onChange={(event) => this.props.onChangeShelf(book, event.target.value)}>
                <option value="move">Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </div>
      </li>
    ))
  )

  updateQuery = (query) => {

    const trimmed = query.trim()
    // found out this works a lot better than if I set the query state in searchBooks...

    if (trimmed) {
      this.setState({
        query: trimmed
      })
      this.searchBooks(trimmed)
    } else {
      this.setState({results: []})
      // clear result and show friendly message to the user
    }
  }

  searchBooks = (query) => {
    console.log(query)
    /* Books that are coming from BooksAPI.search do not have a .shelf property, even if they are in one of your shelves! 
    You need to assign each book a shelf value, you can do this by checking the response with your current books in shelves. */
    BooksAPI.search(query).then((response) => {
      if(response && response.error === "empty query"){
        this.setState({results: []});
      } else {
        response.map((searchBook) => (
          this.props.books.map((currBook) => (
            currBook.id === searchBook.id && (searchBook.shelf = currBook.shelf)
          ))
        ))

        this.setState({
          results: response
        }) 
      }
    },
    error => {
      this.setState({results: []});
    })
  }


  render() {
    const { results } = this.state

    //let queryResults = this.state.results

    // if (query) {
    //   const match = new RegExp(escapeRegExp(query), 'i')
    //   queryResults = results.filter(result => match.test(result.title))
    // } else {
    //   queryResults = results
    // }

    results.sort(sortBy('title'))


    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link 
            to='/'
            className="close-search" 
            onClick={this.setInitialState}
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              id="searchBar"
              type="text" 
              placeholder="Search by title or author"
              // value={query}
              //I had to comment this out because it wasn't letting me clear out the query 
              //or allow spaces... I'm not sure I understand why
              onChange={event => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {results.length > 0 && this.renderResults(results)}
            {results.length === 0 && (
              <div>No Results Returned</div>
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks