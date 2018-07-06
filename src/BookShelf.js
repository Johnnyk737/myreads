import React, { Component } from 'react'
import {Link} from 'react-router-dom'


class Shelf extends Component {
//I don't need state here. Probably

  handleChange = (book, shelf) => {
    //We don't want to call the parent function if the same shelf or none is clicked
    if (book.shelf !== shelf && shelf !== 'none') {
      this.props.handleChange(book, shelf)
    } else {
      console.log("Same shelf or none has been chosen")
    }
  }

  // let books = ''
  render() {
    //let shelf = this.props.shelf
    let books = this.props.books.filter((book) => book.shelf === this.props.shelf)
    //let selectedValue = this.props.selectedValue
    //console.log(this.props.shelf)

    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
        {books.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" 
                  style={{ width: 128, height: 193, 
                    backgroundImage: 'url(' + book.imageLinks.thumbnail + ')'}}></div>
                <div className="book-shelf-changer">
                  <select
                      value={this.props.shelf}
                      onChange={(event) => this.handleChange(book, event.target.value)}>
                    <option value="move">Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors[0]}</div>
            </div>
          </li>
          ))}
        </ol>
      </div>
    )
  }
}

class BookShelf extends Component {

  render() {
      return (
          <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                  <Shelf
                    books={this.props.books}
                    //selectedValue={this.state.selectedValue}
                    shelf={"currentlyReading"}
                    handleChange={this.props.onChangeShelf}
                  /> 
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                  <Shelf
                    books={this.props.books}
                    shelf={"wantToRead"}
                    handleChange={this.props.onChangeShelf}
                  />
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                  <Shelf
                    books={this.props.books}
                    shelf={"read"}
                    handleChange={this.props.onChangeShelf}
                  /> 
              </div>
            </div>
          </div>
          <div className="open-search">
            <Link 
              to='/search'
            >Add a book</Link>
          </div>
        </div>
      )
  }
}

export default BookShelf