import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import Form from '../../Form/Form';
import FormInput from '../../UI/FormInput/FormInput';
import {
  MINIMAL_SYMBOLS,
  MINIMAL_SYMBOLS_ERROR,
  INCORRECT_EMAIL_ERROR,
} from '../../../utils/constants';
import './Login.css';

function Login({ handleLogin, loginError }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
    if (e.target.value.length < MINIMAL_SYMBOLS) {
      setEmailError(MINIMAL_SYMBOLS_ERROR);
    } else if (!isEmail(e.target.value)) {
      setEmailError(INCORRECT_EMAIL_ERROR);
    } else {
      setEmailError('');
    }
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    if (e.target.value.length < MINIMAL_SYMBOLS) {
      setPasswordError(MINIMAL_SYMBOLS_ERROR);
    } else {
      setPasswordError('');
    }
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    handleLogin(email, password);
  }
  if (localStorage.getItem('jwt')) {
    return <Navigate to='/' />;
  }
  return (
    <main className='login'>
      <Form
        handleSubmit={handleLoginSubmit}
        greeting='Рады видеть!'
        buttonText='Войти'
        question='Ещё не зарегистрированы?'
        link='/signup'
        linkName='Регистрация'
        emptyErrors={!emailError && !passwordError && email !== '' && password !== ''}
      >
        <FormInput
          id='email'
          name='email'
          title='E-mail'
          value={email || ''}
          type='email'
          handleChange={handleEmailChange}
          formError={emailError}
        />
        <FormInput
          id='password'
          name='password'
          title='Пароль'
          value={password || ''}
          type='password'
          placeholder='Введите пароль'
          handleChange={handlePasswordChange}
          formError={passwordError}
          error={loginError}
        />
      </Form>
    </main>
  );
}

export default Login;
