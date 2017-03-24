import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import App from './main/js/App';
import createStore from './main/js/redux/store';
import Login from './main/js/components/presentation/Login'

if (typeof window !== 'undefined') {
  const store = createStore(window.__INITIAL_STATE__);

  const history = syncHistoryWithStore(browserHistory, store);

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
        </Route>
        <Route path="/signin" component={Login}>
        </Route>
      </Router>
    </Provider>,
    document.getElementById('root')
  );
}