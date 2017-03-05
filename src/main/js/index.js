/* @flow */
import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { BrowserRouter, ServerRouter, createServerRenderContext } from 'react-router';

import App from './containers/App';

import createStore from './store';

if (typeof window !== 'undefined') {
  const store = createStore(window.__INITIAL_STATE__);

  const app = (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );

  render(app, document.getElementById('mount'));
}

// eslint-disable-next-line import/prefer-default-export
export function renderApp(path : string, state : Object) {
  const store = createStore(state);
  const context = createServerRenderContext();

  function doRender() {
    return renderToString(
      <Provider store={store}>
        <ServerRouter
          location={path}
          context={context}
        >
          <App />
        </ServerRouter>
      </Provider>
    );
  }

  let markup = doRender();

  const result = context.getResult();

  if (result.missed) {
    markup = doRender();
  }

  const head = Helmet.rewind();

  return { markup, head };
}
