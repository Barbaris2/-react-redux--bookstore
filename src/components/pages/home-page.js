import React from 'react';
import BookList from '../book-list';
import ShoppingCardTable from '../shopping-cart-table/index';

const HomePage = () => {
  return (
    <div>
      <BookList />
      <ShoppingCardTable />
    </div>
  );
};

export default HomePage;
