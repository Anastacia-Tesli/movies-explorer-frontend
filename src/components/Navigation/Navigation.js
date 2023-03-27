import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation({ style, onClick, loggedIn }) {
  return (
    <nav className='navigation'>
      {!loggedIn ? (
        <div className='navigation__bar'>
          <NavLink to='/signup' className='navigation__link'>
            Регистрация
          </NavLink>
          <NavLink to='/signin' className='navigation__link navigation__button'>
            Войти
          </NavLink>
        </div>
      ) : (
        <div className={`navigation__main ${style}`}>
          <div className='navigation__links'>
            <NavLink onClick={onClick} to='/' className={({ isActive }) => `navigation__link navigation__link-main ${isActive ? 'navigation__link_active' : ''}`}>
              Главная
            </NavLink>
            <NavLink onClick={onClick} to='/movies' className={({ isActive }) => `navigation__link ${isActive ? 'navigation__link_active' : ''}`}>
              Фильмы
            </NavLink>
            <NavLink onClick={onClick} to='/saved-movies' className={({ isActive }) => `navigation__link ${isActive ? 'navigation__link_active' : ''}`}>
              Сохранённые фильмы
            </NavLink>
          </div>
          <NavLink onClick={onClick} to='/profile' className='navigation__link navigation__link-span'>
            Аккаунт
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
