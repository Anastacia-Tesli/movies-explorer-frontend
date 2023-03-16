import Navigation from '../../Navigation/Navigation';
import './Popup.css';

function Popup({ open, onClick }) {
  return (
    <div className={`popup ${open ? 'popup_open' : ''}`}>
      <div className='popup__background' onClick={onClick} />
      <div className='popup__container'>
        <Navigation onClick={onClick} />
      </div>
    </div>
  );
}

export default Popup;
