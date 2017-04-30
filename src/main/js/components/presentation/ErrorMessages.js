/**
 * Created by wojciech on 30.04.17.
 */
import React from 'react';
import {Message} from 'semantic-ui-react';

require('../../../../../node_modules/semantic-ui/dist/components/message.min.css');

export const LoginError = (props) => (
  <Message negative>
  <Message.Header>
    Nie udało się zalogować :(
  </Message.Header>
  <p>Sprawdź dane i spróbuj jeszcze raz</p>
</Message>
);

export const RegisterError = (props) => (
  <Message negative>
    <Message.Header>
      Nie udało się zarejestrować :(
    </Message.Header>
    <p>Sprawdź dane i spróbuj jeszcze raz</p>
  </Message>
);

export const GenericError = (props) => (
  <Message negative>
    <Message.Header>
      Wystapił błąd
    </Message.Header>
    <p>{props.message}</p>
  </Message>
);