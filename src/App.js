import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import BookShelf from './BookShelf'
import { Route } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'


class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  changeShelf(selectedBook, shelf) {
    /* I'm getting a bunch of errors here
      1. App.js:27 Uncaught TypeError: __WEBPACK_IMPORTED_MODULE_1__BooksAPI__.b(...).then(...).bind is not a function
        This is after I add '.bind(this)' at the end of the promise
      2. Uncaught (in promise) TypeError: _this3.setState is not a function
        This is as it is without the bind
    */
    BooksAPI.update(selectedBook, shelf).then((response) => {
      this.setState(state => ({
        books: state.books.filter(b => b.id !== selectedBook.id).concat(selectedBook)
      }))
    })//.bind(this)
    //console.log(this.state.books)
    //this.componentDidMount()
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookShelf
            books={this.state.books}
            onChangeShelf={this.changeShelf}
            // getShelf={() => {
            //   this.filterShelf()
            // }}
          />
        )}/>
        <Route path='/search' render={() => (
          <SearchBooks 

          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
