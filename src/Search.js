import React, { Component } from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
  state = {
    searchResults: []
  }

  updateQuery = (query) => {
    if (query) {
      this.bookSearch(query)
    } else {
      this.setState({
        searchResults: []
      })
    }
  }

  bookSearch(query) {
    BooksAPI.search(query).then(response => {
      this.setState({
        searchResults: response.error ? [] : this.parseResults(response)
      })
    })
  }

  parseResults(response) {
    const bookIds = this.props.books.map(book => book.id)
    return response.map(book => {
      const currentBook = this.props.books.find(b => b.id === book.id);
      return currentBook ? currentBook : book;
    })
  }

  render() {
    const { onUpdateBook } = this.props
    const { query, searchResults } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {searchResults.map(book => (
              <Book
                key={book.id}
                book={book}
                onUpdateBook={onUpdateBook}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
