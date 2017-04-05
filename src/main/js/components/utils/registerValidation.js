/**
 * Created by wojciech on 02.04.17.
 */
const validateRegister = values => {
  const errors = {};
  if (!values.username || values.username.trim() === '') {
    errors.username = 'Podaj jakiś login :)';
  } else if (values.username.length > 20) {
    errors.username = 'Podaj krótszy niż 20 znaków';
  }

  if(!values.email) {
    errors.email = 'e-mail jest wymagany, podaj go proszę.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'To nie jest poprawny adres e-mail.';
  }

  if(!values.firstName) {
    errors.firstName = 'Podaj jakieś imię :)';
  } else if (values.firstName.length > 20) {
    errors.firstName = 'Aż tak długie? Bez przesady';
  }

  if(!values.lastName) {
    errors.lastName = 'Podaj jakieś nazwisko';
  } else if (values.lastName.length > 30) {
    errors.lastName = 'Aż tak długie? Bez przesady';
  }

  if(!values.password) {
    errors.password = 'Hasło nie może być puste';
  } else if (values.password.length < 5) {
    errors.password = 'Hasło musi zawierać 5 i więcej znaków'
  }

  if(!values.passwordConfirmation) {
    errors.passwordConfirmation = 'Nie moze tu być pusto!';
  } else if (values.passwordConfirmation !== values.password) {
    errors.passwordConfirmation = 'To pole różni się od podanego hasła!';
  }

  return errors;
};

export default validateRegister;