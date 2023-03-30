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
  savedMovies,
  savedResultMovies,
  savedRequest,
  setSavedRequest,
  handleMovies,
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
      handleMovies();
      setRequest(input);
      localStorage.setItem('request', input);
      localStorage.setItem('resultMovies', JSON.stringify(resultMovies));

      return request;
    }
    if (location.pathname === '/saved-movies') {
      getSavedMovies();
      setSavedRequest(input);
    }
  }
  return (
    <section className='search'>
      <div className='search__inputs'>
        <form className='search__field' onClick={handleError} onSubmit={handleSubmit}>
          <div className='search__icon' />
          <input
            className='search__form'
            placeholder='Фильм'
            required
            value={input || ''}
            onClick={() => console.log(localStorage)}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className='search__button' type='submit' />
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
