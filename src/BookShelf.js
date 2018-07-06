import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'

// class BookChanger extends Component {

//   // constructor(props) {
//   //   super(props);
//   //   this.handleChange = this.handleChange.bind(this);
//   // }

//   handleChange(e) {
//     this.props.onChangeShelf(e.target.value);
//   }

//   render() {
//     return (
//         <div className="book-shelf-changer">
//             <select>
//               <option value="move" disabled>Move to...</option>
//               <option value="currentlyReading">Currently Reading</option>
//               <option value="wantToRead">Want to Read</option>
//               <option value="read">Read</option>
//               <option value="none">None</option>
//             </select>
//         </div>
//     )
//   }
// }

class Shelf extends Component {
//I don't need state here. Probably

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
                      value={this.props.shelf ?  this.props.shelf : 'none'}
                      onChange={(event) => this.props.handleChange(book, event.target.value)}>
                    <option value="move" disabled>Move to...</option>
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