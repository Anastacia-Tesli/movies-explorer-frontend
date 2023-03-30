import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import FilterCheckbox from '../UI/FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({
  resultMovies,
  request,
  setRequest,
  switched,
  setSwitched,
  setSavedRequest,
  getAllMovies,
  getSavedMovies,
}) {
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

  function handleSubmit(evt) {
    evt.preventDefault();

    if (location.pathname === '/movies') {
      getAllMovies();
      setRequest(input);
      localStorage.setItem('request', input);
      localStorage.setItem('resultMovies', JSON.stringify(resultMovies));
    }
    if (location.pathname === '/saved-movies') {
      setSavedRequest(input);
    }
  }
  return (
    <section className='search'>
      <div className='search__inputs'>
        <form className='search__field' onSubmit={handleSubmit}>
          <div className='search__icon' />
          <input
            className='search__form'
            placeholder='Фильм'
            required
            value={input || ''}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className='search__button' type='submit' onClick={handleError} />
          <span className={`search__error ${error ? 'error_type_active' : ''}`}>
            Нужно ввести ключевое слово
          </span>
        </form>
        <FilterCheckbox switched={switched} setSwitched={setSwitched} />
      </div>
    </section>
  );
}

export default SearchForm;
