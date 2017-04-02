import {SubmitionError} from "redux-form";
import axios from "axios";

const submitValidation = (values) => {
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
    })
};

export default submitValidation