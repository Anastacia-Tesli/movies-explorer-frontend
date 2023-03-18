import Form from '../../Form/Form';
import FormInput from '../../UI/FormInput/FormInput';
import './Register.css';

function Register() {
  return (
    <div className='register'>
      <Form
        greeting='Добро пожаловать!'
        buttonText='Зарегистрироваться'
        question='Уже зарегистрированы?'
        link='/signin'
        linkName='Войти'
      >
        <FormInput title='Имя' type='text' placeholder='Ваше имя' />
        <FormInput title='E-mail' type='email' placeholder='Введите почту' />
        <FormInput title='Пароль' type='password' placeholder='Введите пароль' />
      </Form>
    </div>
  );
}

export default Register;
