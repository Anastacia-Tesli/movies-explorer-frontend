import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './FilterCheckbox.css';

function FilterCheckbox({ switched, setSwitched }) {
  const location = useLocation();
  const storedSwitch = localStorage.getItem('switch');

  useEffect(() => {
    if (storedSwitch && location.pathname === '/movies') {
      setSwitched(true);
    }
  }, [storedSwitch, setSwitched, location.pathname]);

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
      <input className='filter__checkbox' type='checkbox' onClick={handleSwitch} />
      <div className='filter__switch' />
      <div
        className={`filter__switch-element ${switched ? 'filter__switch-element_type_active' : ''}`}
      />
      <span className='filter__text'>Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;
