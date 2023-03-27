import { useLocation } from 'react-router-dom';
import './FilterCheckbox.css';

function FilterCheckbox({ switched, setSwitched }) {
  const location = useLocation();

  function handleSwitch(evt) {
    evt.preventDefault();
    if (location.pathname === '/movies') {
      if (!switched) {
        setSwitched(true);
        localStorage.setItem('switch', true);
      } else {
        setSwitched(false);
        localStorage.removeItem('switch');
      }
    }
    if (location.pathname === '/saved-movies') {
      if (!switched) {
        setSwitched(true);
      } else {
        setSwitched(false);
      }
    }
  }

  return (
    <label className='filter'>
      <input
        className='filter__checkbox'
        type='checkbox'
        checked={localStorage.getItem('switch')}
        onChange={handleSwitch}
      />
      <div className='filter__switch' />
      <span className='filter__text'>Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;
