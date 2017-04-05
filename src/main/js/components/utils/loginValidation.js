/**
 * Created by Wojtek on 2017-04-02.
 */

const validateLogin = values => {
  const errors = {};
  if(!values.login || values.login.trim() === '') {
    errors.login = 'Podaj jakiś login :)';
  }

  if(!values.password || values.password.trim() === '') {
    errors.password = 'Hasło nie może być puste'
  } else if (values.password.length < 5) {
    errors.password = 'Podano zbyt krótkie hasło'
  }

  return errors;
};

export default validateLogin;