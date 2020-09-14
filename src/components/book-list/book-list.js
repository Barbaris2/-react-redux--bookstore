import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';
import { withBookstoreService } from '../hoc';
import { booksLoaded } from '../../actions';
import { compose } from '../../utils';

import './book-list.css';

class BookList extends Component {
  componentDidMount() {
    // 1. recieve data
    const { bookstoreService } = this.props;
    const data = bookstoreService.getBooks();
    console.log(data);
    // 2. dispatch action to store
    this.props.booksLoaded(data);
  }

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
  свойство books а в качестве значения будет state.books (глабальный стейт redux). Другими словами эта функция определяет какие свойства получит от Redux
 */

const mapDispathToProps = { booksLoaded };

/**
 mapDispathToProps - функция которая принимает dispatch и возврвщает объект, где ключи это свойства которые будем присваивать компоненту, а значение это функция которую будет принимать newBooks и будет диспатчить действие с типом и пайлоад. т.е какие акшин будет переданы в стор.
 */

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispathToProps)
)(BookList);

/**
  Как только загружается bookList он получает данные из сервиса и сразу же диспатчит новый акшин в стор и передает данные которые получил в редакс стор.
 */

/**
    В приложении начинаем с пустого массива в redux store, как только компонент загружается происходит следующие действия функция connect оборачивает BookList в компонент высшего порядка который подключается к redux store. При помощи mapStateToProps, mapDispathToProps конфигурируем как происходит подключение. Когда компонент появляется на экране мы получаем сервис из контекста ( HOC компонент withBookstoreService), есть доступ к сервису а значит мы можем получить данные. После сразу же вызываем функцию booksLoaded. Он создает действие и автоматически передает это действие в Redux store. Передаем данные которые получили от сервиса в store, store вызывает наш редюсер, редюсер получает действие BOOKS_LOADED и обновляет список книг в Store. Обновленные список книг снова возвращается к нашему компоненту через mapStateToProps через коллекцию  books и в функции render отрисовывает этот список.
  */
