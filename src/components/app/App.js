import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomePage, CardPage } from '../pages';
import ShopHeader from '../shop-header/index';
import './app.css';

const App = () => {
  return (
    <main role='main' className='container'>
      <ShopHeader />
      <Switch>
        <Route path='/' component={HomePage} exact />
        <Route path='/card' component={CardPage} />
      </Switch>
    </main>
  );
};

export default App;
