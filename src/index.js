import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import './index.css';
import App from './containers/App/App';

const client = new ApiClient();
const store = createStore(client);

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));
