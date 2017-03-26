import React from "react";
import {connect} from "react-redux";
import {Container, Header} from "semantic-ui-react";

require('../../../../../node_modules/semantic-ui/dist/components/container.min.css');
require('../../../../../node_modules/semantic-ui/dist/components/header.min.css');

const ServerError = () => (
  <Container>
    <Header as="h1">Błąd serwera</Header>
    <p>Coś nie dało rady po stronie serwera, przepraszamy!</p>
  </Container>
);

const NotFound = () => (
  <Container>
    <Header as="h1">Nie znaleziono</Header>
    <p>Ten zasób nie istnieje, poszukaj czegoś innego.</p>
  </Container>
);

const Errors = (props) => {
  switch (props.errors.status) {
    case 500:
      return <ServerError />;

    case 404:
    default:
      return <NotFound />;
  }
};

/* Inject errors state and dispatch() into props */
export default connect(state => ({errors: state.errors}))(Errors);
