import { createStore as _createStore, applyMiddleware } from 'redux';
import createMiddleware from './middleware/clientMiddleware.js';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import asyncMiddleware from 'redux-async';
import products from './modules/products.js';

export default function createStore(history, client, data) {
  const reduxRouterMiddleware = routerMiddleware(history);

  const middleware = [createMiddleware(client), reduxRouterMiddleware, thunk];

  let finalCreateStore;
  finalCreateStore = applyMiddleware(...middleware, asyncMiddleware)(_createStore);

  const store = finalCreateStore(products, data);

  return store;
}