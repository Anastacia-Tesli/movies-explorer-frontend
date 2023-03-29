import { useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import Form from '../../Form/Form';
import FormInput from '../../UI/FormInput/FormInput';
import './Login.css';

function Login({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

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

  function handleLoginSubmit(e) {
    e.preventDefault();
    handleLogin(email, password);
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
        />
      </Form>
    </main>
  );
}

export default Login;
