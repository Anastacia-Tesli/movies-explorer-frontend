import { useState } from 'react';
import Form from '../../Form/Form';
import FormInput from '../../UI/FormInput/FormInput';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  return (
    <main className='login'>
      <Form
        greeting='Рады видеть!'
        buttonText='Войти'
        question='Ещё не зарегистрированы?'
        link='/signup'
        linkName='Регистрация'
      >
        <FormInput
          id={email}
          title='E-mail'
          value={email || ''}
          type='email'
          placeholder='Введите почту'
          handleChange={handleEmailChange}
        />
        <FormInput
          id={password}
          title='Пароль'
          value={password || ''}
          type='password'
          placeholder='Введите пароль'
          handleChange={handlePasswordChange}
        />
      </Form>
    </main>
  );
}

export default Login;
