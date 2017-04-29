import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

export default function configureStore(initialState, reduxRouting) {

  return createStore(reducers, initialState, compose(
    applyMiddleware(thunk),
    applyMiddleware(reduxRouting),
    (typeof window !== 'undefined' && window.devToolsExtension) ? window.devToolsExtension() : ''
  ));
}
