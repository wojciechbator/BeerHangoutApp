/* @flow */
import React from 'react';
import { connect } from 'react-redux';

const ServerError = () => (
  <div>
    <h1>Błąd serwera</h1>
    <p>Coś nie dało rady po stronie serwera, przepraszamy!.</p>
  </div>
);

const NotFound = () => (
  <div>
    <h1>Nie znaleziono</h1>
    <p>Ten zasób nie istnieje, poszukaj czegoś innego.</p>
  </div>
);

type Props = {
  errors: {
    // error: string,
    // exception: string,
    // message: string,
    // path: string,
    // timestamp: number,
    status: number
  }
};

const Errors = (props : Props) => {
  switch (props.errors.status) {
    case 500:
      return <ServerError />;

    case 404:
    default:
      return <NotFound />;
  }
};

/* Inject errors state and dispatch() into props */
export default connect(state => ({ errors: state.errors }))(Errors);
