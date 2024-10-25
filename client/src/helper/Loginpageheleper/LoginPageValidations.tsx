import { Emailvalidate, Passwordvalidate } from '../FormValidations';

type dataPropstype = {
  email: string;
  password: string;
};

interface errortype {
  email?: string;  // make fields optional
  password?: string;
}

const LoginPageValidations = (data: dataPropstype): errortype => {
  const error: errortype = {}; // Initialize as an empty object to dynamically add errors

  const isEmailValid = Emailvalidate(data.email);
  const isPasswordValid = Passwordvalidate(data.password);

  
  if (!isEmailValid) {
    error.email = "Email is not valid";
  }

  if (!isPasswordValid) {
    error.password = "Password is not valid";
  }

  return error;  // Return the error object directly, not wrapped in another object
};

export default LoginPageValidations;
