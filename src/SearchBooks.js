import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import sortBy from 'sort-by'

class SearchBooks extends Component {

    state = {
        query: '',
        results: []
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
                        value={book.shelf}
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
        //found out this works a lot better than if I set the query state in searchBooks...
        this.setState({
            query: query.trim()
        })

        if (query) {
            this.searchBooks(query)
        } else {
            this.setState({results: []})
        }
    }

    searchBooks = (query) => {
        BooksAPI.search(query).then((response) => {
            console.log(response)
            if(response && response.error === "empty query"){
                this.setState({results: []});
            } else {
            //TODO: Check to see if the current results contain any books that are already on the shelf.
            //If so, remove them from the search results
            response.map((searchBook) => (
                this.props.books.map((currBook) => (
                    searchBook.id === currBook.id
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
        const { query, results } = this.state

        let queryResults

        if (query) {
            const match = new RegExp(escapeRegExp(query))
            queryResults = results.filter(result => match.test(result.title))
        } else {
            queryResults = results
        }
    
        queryResults.sort(sortBy('title'))


        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link 
                        to='/'
                        className="close-search" 
                    >Close</Link>
                    <div className="search-books-input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Search by title or author"
                            value={query}
                            onChange={event => this.updateQuery(event.target.value)}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {queryResults.length > 0 && this.renderResults(queryResults)}
                        {queryResults.length === 0 && (
                            <div>No Results Returned</div>
                        )}
                    </ol>
                </div>
          </div>
        )
    }
}

export default SearchBooks