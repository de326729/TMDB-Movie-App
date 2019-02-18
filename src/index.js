import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './index.css';

import configure from './store/configureStore'
import App from './components/App';

const store = configure();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
);
