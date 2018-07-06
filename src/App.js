import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import BookShelf from './BookShelf'
import { Route } from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  changeShelf = (selectedBook, shelf) => {
    BooksAPI.update(selectedBook, shelf).then((response) => {
      this.setState(state => ({
        books: state.books.filter(book => book.id !== selectedBook.id)
      }))
    })
    //console.log(this.state.books)
    this.componentDidMount()
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
            onChangeShelf={this.changeShelf}
            books={this.state.books}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
