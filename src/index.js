import React from 'react';
import ReactDOM from 'react-dom';

import store from './app/store';
import { Provider } from 'react-redux';

import './index.scss';

import App from './components/App/App';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
