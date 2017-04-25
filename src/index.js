import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import ReactStormpath, { Router, AuthenticatedRoute, LoginRoute } from 'react-stormpath';

// import App from './main/js/App';
import createStore from './main/js/redux/store';
import LoginPage from './main/js/components/layout/LoginPage';
import RegisterPage from './main/js/components/layout/RegisterPage';
import Home from './main/js/components/layout/Home';

ReactStormpath.init({
	endpoints: {
		login: '/signin',
		register: '/signup',
		forgotPassword: '/lostpass'
	}
});

if (typeof window !== 'undefined') {
  const store = createStore(window.__INITIAL_STATE__);

  const history = syncHistoryWithStore(browserHistory, store);

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <AuthenticatedRoute path='/' component={Home}/>
        <LoginRoute path='/signin' component={LoginPage}/>
        <Route path='/register' component={RegisterPage}/>
      </Router>
    </Provider>,
    document.getElementById('root')
  );
}
