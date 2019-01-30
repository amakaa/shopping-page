import { createStore as _createStore, applyMiddleware } from 'redux';
import createMiddleware from './middleware/clientMiddleware.js';
import thunk from 'redux-thunk';
import products from './modules/products.js';

export default function createStore(client, data) {

  const middleware = [createMiddleware(client), thunk];

  let finalCreateStore;
  finalCreateStore = applyMiddleware(...middleware)(_createStore);

  const store = finalCreateStore(products, data);

  return store;
}