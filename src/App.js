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
      console.log(books)
      console.log(books[0].shelf)
    })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBooks 
            onCloseSearch={() => {
              this.closeSearch()
            }}
          />
        )}/>
        
        <Route exact path='/' render={() => (
          <BookShelf
            books={this.state.books}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
