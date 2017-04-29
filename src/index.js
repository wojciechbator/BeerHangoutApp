import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import {routerMiddleware, syncHistoryWithStore} from 'react-router-redux';

import App from './main/js/App';
import createStore from './main/js/redux/store';
import LoginPage from './main/js/components/layout/LoginPage';
import RegisterPage from './main/js/components/layout/RegisterPage';
import Home from './main/js/components/layout/Home';

if (typeof window !== 'undefined') {
  const reduxRouting = routerMiddleware(browserHistory);
  const store = createStore(window.__INITIAL_STATE_, reduxRouting);
  const history = syncHistoryWithStore(browserHistory, store);

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path='/' component={App}>
          <IndexRoute component={Home}/>
          <Route path='/signin' component={LoginPage}/>
          <Route path='/register' component={RegisterPage}/>
        </Route>
      </Router>
    </Provider>,
    document.getElementById('root')
  );
}
