/* @flow */
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

import type { Store } from './types';

export default function configureStore(initialState : Object) : Store {
  const store = createStore(reducer, initialState, compose(
    applyMiddleware(thunk),
    (typeof window !== 'undefined' && window.devToolsExtension) ? window.devToolsExtension() : fn => fn
  ));
  return store;
}
