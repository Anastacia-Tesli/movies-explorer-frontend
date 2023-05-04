import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import FilterCheckbox from '../UI/FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({ switched, setSwitched, handleSubmit, clickSwitch }) {
  const location = useLocation();
  const [input, setInput] = useState(
    location.pathname === '/movies' && localStorage.getItem('request')
      ? localStorage.getItem('request')
      : '',
  );
  const [error, setError] = useState(false);

  function handleError() {
    setError(false);
    if (input === '') {
      setError(true);
    }
  }

  function handleChange(e) {
    setInput(e.target.value);
  }

  return (
    <section className='search'>
      <div className='search__inputs'>
        <form
          className='search__field'
          onSubmit={(evt) => {
            evt.preventDefault();
            handleSubmit(input);
          }}
        >
          <div className='search__icon' />
          <input
            className='search__form'
            placeholder='Фильм'
            required
            value={input || ''}
            onChange={handleChange}
            //onClick={() => {
            //  localStorage.removeItem('request');
            //  localStorage.removeItem('resultMovies');
            //}}
          />
          <button className='search__button' type='submit' onClick={handleError} />
          <span className={`search__error ${error ? 'error_type_active' : ''}`}>
            Нужно ввести ключевое слово
          </span>
        </form>
        <FilterCheckbox switched={switched} setSwitched={setSwitched} clickSwitch={clickSwitch} />
      </div>
    </section>
  );
}

export default SearchForm;
