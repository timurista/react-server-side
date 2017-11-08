// Startup for client side app
import 'babel-polyfill'; // polyfill help function for async await syntax
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import routes from './Routes';
import reducers from './reducers';

const store = createStore(
  reducers,
  window.INITIAL_STATE, 
  applyMiddleware(thunk)
)

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(routes)}</div>
    </BrowserRouter>
  </Provider>, 
  document.querySelector('#root'));

