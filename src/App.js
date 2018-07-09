import React from 'react'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import BookShelf from './BookShelf'
import { Route } from 'react-router-dom'
import './App.css'


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
    BooksAPI.update(selectedBook, shelf).then(() => {
      selectedBook.shelf = shelf
      this.setState(state => ({
        books: state.books.filter(book => book.id !== selectedBook.id).concat([selectedBook])
      }))
    })
    //console.log(this.state.books)
    //this.componentDidMount() //don't need this
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookShelf
            books={this.state.books}
            onChangeShelf={this.changeShelf}

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
