import { NavLink } from 'react-router-dom';
import Logo from '../UI/Logo/Logo';
import PageTitle from '../UI/PageTitle/PageTitle';
import './Form.css';

function Form({
  handleSubmit,
  children,
  greeting,
  buttonText,
  question,
  link,
  linkName,
  emptyErrors,
}) {
  return (
    <form className='form' onSubmit={handleSubmit}>
      <div className='form__content'>
        <Logo />
        <PageTitle title={greeting} />
        <fieldset className='form__inputs'>{children}</fieldset>
      </div>
      <div className='form__options'>
        <button className='form__button' type='submit' disabled={!emptyErrors}>
          {buttonText}
        </button>
        <span className='form__question'>
          {question}{' '}
          <NavLink className='form__link' to={link}>
            {linkName}
          </NavLink>
        </span>
      </div>
    </form>
  );
}

export default Form;
