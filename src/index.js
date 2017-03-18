import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import App from './App';
import createStore from './redux/store';

if (typeof window !== 'undefined') {
  const store = createStore(window.__INITIAL_STATE__);

  const history = syncHistoryWithStore(browserHistory, store);

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
        </Route>
      </Router>
    </Provider>,
    document.getElementById('root')
  );
}