import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/app';
import ErrorBoundry from './components/error-boundry';
import BookstoreService from './services/bookstore-service';
import { BookstoreServiceProvider } from './components/bookstore-service-context';

import store from './store';

const bookstoreService = new BookstoreService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <BookstoreServiceProvider value={bookstoreService}>
        <Router>
          <App />
        </Router>
      </BookstoreServiceProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById('root')
);
/**
  Все компоненты App имеют доступ к роутингу, имеют доступ к
  bookstoreService. Если в них будут ошибки эти ошибки будут 
  отлавливаться ErrorBoundry. Все компоненты имеют доступ к 
  redux-store.

  === Каркам react-redux приложения:
  // Предоставляет доступ к redux-store
  <Provider store={store}>
    // Обработка ошибок в компанентах ниже
    <ErrorBoundry>
      // Передает сервис через ContextAPI
      <BookstoreServiceProvider value={bookstoreService}>
        // Роутинг
        <Router>
          // Приложение
          <App />
 */
