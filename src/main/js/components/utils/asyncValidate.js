/**
 * Created by wojciech on 06.04.17.
 */
import axios from 'axios';
import {SubmitionError} from "redux-form";

const asyncValidate = values => {
  return axios.get('/api/users')
    .then((data) => {
      // if (values.username !== data.username) {
      //   throw new SubmitionError({
      //     username: 'Taki użytkownik nie istnieje',
      //     _error: 'Nie udało się zalogować'
      //   });
      // } else if (values.password !== data.password) {
      //   throw new SubmitionError({
      //     password: 'Podano złe hasło',
      //     _error: 'Nie udało się zalogować'
      //   });
      // } else {
      //   return values;
      // }
    });
};

export default asyncValidate;