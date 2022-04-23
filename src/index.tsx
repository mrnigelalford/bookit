import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import ScrollToTop from './ScrollToTop';
import Header from './components/header/Header';

ReactDOM.render(
  <BrowserRouter >
    <ScrollToTop />
    <Header />
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
