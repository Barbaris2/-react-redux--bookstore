import React, { Component } from 'react';
import BookListItem from '../book-list-item';

import { connect } from 'react-redux';

import { withBookstoreService } from '../hoc';
import { fetchBooks, bookAddedToCart } from '../../actions';
import { compose } from '../../utils';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './book-list.css';

const BookList = ({ books, onAddedToCart }) => {
  return (
    <ul className='book-list'>
      {books.map(book => {
        return (
          <li key={book.id}>
            <BookListItem
              book={book}
              onAddedToCart={() => onAddedToCart(book.id)}
            />
          </li>
        );
      })}
    </ul>
  );
};

/**
  Презентационные контейнеры отвечают толька за рендеринг.
  Компоненты-контейнеры работают с redux, реализуют loading, error и другую логику.
 */

class BookListContainer extends Component {
  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    const { books, loading, error, onAddedToCart } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorIndicator />;
    }

    return <BookList books={books} onAddedToCart={onAddedToCart} />;
  }
}

const mapStateToProps = ({ bookList: { books, loading, error } }) => {
  return { books, loading, error };
};

/**
  mapStateToProps (принимает state) функция которая говорит, что в компонент
   нужно будет передать  свойство books а в качестве значения будет state.
   books (глабальный стейт redux). Другими словами эта функция определяет 
   какие свойства получит от Redux
 */

const mapDispatchToProps = (dispatch, { bookstoreService }) => {
  return {
    fetchBooks: fetchBooks(bookstoreService, dispatch),
    onAddedToCart: id => dispatch(bookAddedToCart(id))
  };
};

/**
 mapDispathToProps - функция которая принимает dispatch и возврвщает объект,
  где ключи это свойства которые будем присваивать компоненту, а значение это
  функция которую будет принимать newBooks и будет диспатчить действие с 
  типом и пайлоад. т.е какие акшин будет переданы в стор.

 Вместо функции мы можем передать объект и он попадет в качестве первого
  аргумента в bindActionCreators(из библиотеки redux). Фактически по умрлчанию выполнится : 
  
  mapDispathToProps = (dispacth) => {
    return bindActionCreators({
      booksLoaded
    }, dispatch)
  }

 */

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);

/**
  Как только загружается bookList он получает данные из сервиса и сразу же диспатчит новый акшин в стор и передает данные которые получил в редакс стор.
 */

/**
    В приложении начинаем с пустого массива в redux store, как только компонент загружается происходит следующие действия функция connect оборачивает BookList в компонент высшего порядка который подключается к redux store. При помощи mapStateToProps, mapDispathToProps конфигурируем как происходит подключение. Когда компонент появляется на экране мы получаем сервис из контекста ( HOC компонент withBookstoreService), есть доступ к сервису а значит мы можем получить данные. После сразу же вызываем функцию booksLoaded. Он создает действие и автоматически передает это действие в Redux store. Передаем данные которые получили от сервиса в store, store вызывает наш редюсер, редюсер получает действие BOOKS_LOADED и обновляет список книг в Store. Обновленные список книг снова возвращается к нашему компоненту через mapStateToProps через коллекцию  books и в функции render отрисовывает этот список.
  */
