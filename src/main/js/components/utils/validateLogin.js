const validate = values => {
  const errors = {};
  if(!values.username || values.username.trim() === '') {
    errors.username = 'Podaj jakiś login :)';
  }

  if(!values.password || values.password.trim() === '') {
    errors.password = 'Hasło nie może być puste'
  } else if (values.password.length < 5) {
    errors.password = 'Podano zbyt krótkie hasło'
  }

  return errors;
};

export default validate
