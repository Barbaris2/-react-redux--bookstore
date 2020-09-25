import React from 'react';
import { BookstoreServiceConsumer } from '../bookstore-service-context';

const withBookstoreService = () => Wrapped => {
  return props => {
    return (
      <BookstoreServiceConsumer>
        {bookstoreService => {
          return <Wrapped {...props} bookstoreService={bookstoreService} />;
        }}
      </BookstoreServiceConsumer>
    );
  };
};

export default withBookstoreService;

/**
  withBookstoreService это функция которая возвращает функцию
  которая принимает оборочиваемый компонент (в HOC создаем новый 
  компонент). Возвращаем функцию которая принимает props и эта 
  функция возвращает JSX рахметку (компонент). В теле компоненты
  используем BookstoreServiceConsumer для того чтобы получить доступ 
  к сервису. Оборачиваем wrap-компонент в BookstoreServiceConsumer.
  Для того что бы получить данные из consumer нужно передать 
  рендер-фунцию. Эта функция которая примет в качестве своего 
  значения тот сервис который передадим через контекст, и возвращает 
  тот самый компонент который оборачиваем и передаем в него все свойства
  который получил собственный компонент и добавляем еще одно свойство
  bookstoreService, которой получили из контекста. Теперь можно создавать 
  компоненты который будет получать bookstoreService из контекста.
 */
