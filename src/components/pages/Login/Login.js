import { useState } from 'react';
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
    if (email.length < 3) {
      setEmailError('Не менее трех символов');
    } else {
      setEmailError('');
    }
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    if (password.length < 3) {
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
        emptyErrors={!emailError && !passwordError}
      >
        <FormInput
          id='email'
          name='email'
          title='E-mail'
          value={email || ''}
          type='email'
          pattern='/^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u'
          placeholder='Введите почту'
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
