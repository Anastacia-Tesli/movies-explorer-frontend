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
import './Register.css';

function Register({ handleRegister, registerError }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [inactive, setInactive] = useState(false);

  function handleNameChange(e) {
    setName(e.target.value);
    if (e.target.value.length < MINIMAL_SYMBOLS) {
      setNameError(MINIMAL_SYMBOLS_ERROR);
    } else {
      setNameError('');
    }
  }

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

  function handleRegisterSubmit(e) {
    e.preventDefault();
    handleRegister(name, email, password, setInactive);
  }
  if (localStorage.getItem('jwt')) {
    return <Navigate to='/' />;
  }
  return (
    <div className='register'>
      <Form
        handleSubmit={handleRegisterSubmit}
        greeting='Добро пожаловать!'
        buttonText='Зарегистрироваться'
        question='Уже зарегистрированы?'
        link='/signin'
        linkName='Войти'
        emptyErrors={
          !nameError &&
          !emailError &&
          !passwordError &&
          name !== '' &&
          email !== '' &&
          password !== ''
        }
      >
        <FormInput
          id='name'
          name='name'
          title='Имя'
          type='text'
          placeholder='Ваше имя'
          value={name || ''}
          handleChange={handleNameChange}
          formError={nameError}
          disabled={inactive}
        />
        <FormInput
          id='email'
          name='email'
          title='E-mail'
          type='email'
          placeholder='Введите почту'
          value={email || ''}
          handleChange={handleEmailChange}
          formError={emailError}
          disabled={inactive}
        />
        <FormInput
          id='password'
          name='password'
          title='Пароль'
          type='password'
          placeholder='Введите пароль'
          value={password || ''}
          handleChange={handlePasswordChange}
          error={registerError}
          formError={passwordError}
          disabled={inactive}
        />
      </Form>
    </div>
  );
}

export default Register;
