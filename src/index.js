import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';

import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import './index.css';
import App from './containers/App/App';

const history = createHistory();
const client = new ApiClient();
const store = createStore(history, client);

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));
