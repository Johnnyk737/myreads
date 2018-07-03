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
      console.log(books)
      //this.filterShelf('wantToRead')
    })
  }

  filterShelf(shelf) {
    // this.setState((state) => {
    //   // books: state.books.filter(() => this.state.books.shelf === shelf)
    //   console.log(state.books.filter((book) => book.shelf === shelf))
    //   return state.books.filter((book) => book.shelf === shelf)
    // })

    return this.state.books.filter((book) => book.shelf === shelf)

  }

  changeShelf(selectedBook, selected) {
    // this.setState((state) => ({
    //   books: state.books.map((book) => {
    //     if(book.id === selectedBook) {
    //       book.shelf = selected
    //     }
    //     return book
    //   })
    // }))
    console.log(this.state.books)
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBooks 

          />
        )}/>
        
        <Route exact path='/' render={() => (
          <BookShelf
            books={this.state.books}
            onChangeShelf={() => {this.changeShelf()}}
            // getShelf={() => {
            //   this.filterShelf()
            // }}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
