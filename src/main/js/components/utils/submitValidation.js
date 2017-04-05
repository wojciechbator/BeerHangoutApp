import { SubmitionError } from "redux-form";
import axios from "axios";

const submitValidation = values => {
  const errors = {};
  if(!values.login || values.login.trim() === '') {
    errors.login = 'Podaj jakiś login :)';
  }

  if(!values.password || values.password.trim() === '') {
    errors.password = 'Hasło nie może być puste'
  } else if (values.password.length < 5) {
    errors.password = 'Podano zbyt krótkie hasło'
  }

  axios.get('/api/users')
    .then((data) => {
      if (!data.includes(values.username)) {
        throw new SubmitionError({
          username: 'Taki użytkownik nie istnieje',
          _error: 'Nie udało się zalogować'
        });
      } else if (values.password !== data.password) {
        throw new SubmitionError({
          password: 'Podano złe hasło',
          _error: 'Nie udało się zalogować'
        });
      } else {
        return values;
      }
    });

  return errors;
};

export default submitValidation