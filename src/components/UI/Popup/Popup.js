import Navigation from '../../Navigation/Navigation';
import './Popup.css';

function Popup({ open, onClick, loggedIn }) {
  return (
    <div className={`popup ${open ? 'popup_open' : ''}`}>
      <div className='popup__background' onClick={onClick} />
      <div className='popup__container'>
        <Navigation onClick={onClick} loggedIn={loggedIn} />
      </div>
    </div>
  );
}

export default Popup;
