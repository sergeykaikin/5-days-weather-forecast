import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { routes } from './application/routes';
import { store } from './application/store';

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} />
  </Provider>,
  document.getElementById('root')
);
