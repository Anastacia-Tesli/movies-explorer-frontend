import Logo from '../UI/Logo/Logo';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header({ open, onOpen, onClose, loggedIn }) {
  return (
    <header className='header'>
      <Logo />
      <Navigation style={`header__navigation`} loggedIn={loggedIn} />
      {!loggedIn ? null : (
        <button className='header__burger' onClick={open ? onClose : onOpen}>
          <div className={`header__burger-bar ${open ? 'header__burger-open' : ''}`} />
          <div className={`header__burger-bar ${open ? 'header__burger-open' : ''}`} />
          <div className={`header__burger-bar ${open ? 'header__burger-open' : ''}`} />
        </button>
      )}
    </header>
  );
}

export default Header;
