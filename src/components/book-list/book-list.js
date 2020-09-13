import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';

import './book-list.css';

class BookList extends Component {
  render() {
    const { books } = this.props;
    return (
      <ul>
        {books.map(book => {
          return (
            <li key={book.id}>
              <BookListItem book={book} />
            </li>
          );
        })}
      </ul>
    );
  }
}

const mapStateToProps = ({ books }) => {
  return { books };
};
/**
  mapStateToProps функция которая говорит, что в компонент нужно будет передать 
  свойство booksа в качестве значения будет state.books (глабальный стейт redux). Другими словами эта функция определяет какие свойства получит Redux
 */

export default connect(mapStateToProps)(BookList);
