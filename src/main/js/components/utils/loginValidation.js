/**
 * Created by Wojtek on 2017-04-02.
 */
import axios from 'axios';

const validateLogin = (values) => {
  const errors = {};
  if(!values.login) {
    errors.login = 'Podaj jakiś login :)';
  }

  if(!values.password) {
    errors.password = 'Hasło nie może być puste'
  } else if (values.password.length < 5) {
    errors.password = 'Podano zbyt krótkie hasło'
  }
};

export default validateLogin;