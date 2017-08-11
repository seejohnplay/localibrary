import React from 'react'
import { Route, Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({
        books: books
      })
    })
  }

  filterBooksBy(books, shelf) {
    return books.filter(book => book.shelf === shelf)
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf
      this.setState(state => ({
          books: state.books
      }));
    })
  }

  render() {
    const { books } = this.state

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>Localibrary</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf
                  title="Currently Reading"
                  books={this.filterBooksBy(books, "currentlyReading")}
                  onUpdateBook={this.updateBook}
                />
                <Bookshelf
                  title="Want to Read"
                  books={this.filterBooksBy(books, "wantToRead")}
                  onUpdateBook={this.updateBook}
                />
                <Bookshelf
                  title="Read"
                  books={this.filterBooksBy(books, "read")}
                  onUpdateBook={this.updateBook}
                />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />

        <Route path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )} />

      </div>
    )
  }
}

export default BooksApp
