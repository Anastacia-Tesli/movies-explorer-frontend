import { NavLink } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <main className='not-found'>
      <div className='not-found__info'>
        <span className='not-found__number'>404</span>
        <p className='not-found__text'>Страница не найдена</p>
      </div>
      <NavLink className='not-found__link' to='/movies'>
        Назад
      </NavLink>
    </main>
  );
}

export default NotFound;
