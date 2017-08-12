import React from 'react'
import Book from './Book'

const Bookshelf = props => {
  const { books, onUpdateBook, title } = props

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => (
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

export default Bookshelf
