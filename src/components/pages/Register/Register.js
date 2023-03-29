import { useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import Form from '../../Form/Form';
import FormInput from '../../UI/FormInput/FormInput';
import './Register.css';

function Register({ handleRegister, error }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  function handleNameChange(e) {
    setName(e.target.value);
    console.log(e.target.value);
    if (e.target.value.length < 3) {
      setNameError('Не менее трех символов');
    } else {
      setNameError('');
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
    if (e.target.value.length < 3) {
      setEmailError('Не менее трех символов');
    } else if (!isEmail(e.target.value)) {
      setEmailError('Некорректный формат почты');
    } else {
      setEmailError('');
    }
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    if (e.target.value.length < 3) {
      setPasswordError('Не менее трех символов');
    } else {
      setPasswordError('');
    }
  }

  function handleRegisterSubmit(e) {
    e.preventDefault();
    handleRegister(name, email, password);
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
        />
        <FormInput
          id='password'
          name='password'
          title='Пароль'
          type='password'
          placeholder='Введите пароль'
          value={password || ''}
          handleChange={handlePasswordChange}
          error={error}
          formError={passwordError}
        />
      </Form>
    </div>
  );
}

export default Register;
