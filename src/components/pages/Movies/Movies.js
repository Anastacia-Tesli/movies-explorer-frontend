import { useState } from 'react';
import { moviesApi } from '../../../utils/MoviesApi';
import SearchForm from '../../SearchForm/SearchForm';
import MoviesCardList from '../../MoviesCardList/MoviesCardList';
import Preloader from '../../UI/Preloader/Preloader';
import { SHORT_MOVIE_DURATION } from '../../../utils/constants';
import './Movies.css';

function Movies({
  movies,
  setMovies,
  handleAddMovie,
  handleDeleteMovie,
  savedMovies,
  savedResultMovies,
  savedRequest,
  setSavedRequest,
  getSavedMovies,
}) {
  const [preloader, setPreloader] = useState(false);
  const isSwitched = localStorage.getItem('switch');
  const [switched, setSwitched] = useState(false);
  const [error, setError] = useState('');

  function getMovies() {
    setPreloader(true);
    moviesApi
      .getMovies()
      .then((res) => {
        setMovies(res);
        localStorage.setItem('allMovies', JSON.stringify(res));
      })
      .then(() => {
        filterMovies();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
        setError(
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
        );
      })
      .finally(() => setPreloader(false));
  }

  function filterMovies() {
    const allMovies = JSON.parse(localStorage.getItem('allMovies'));
    const request = localStorage.getItem('request');
    function filterDefault() {
      const filtered = allMovies.filter((movie) => movie.nameRU.toLowerCase().includes(request));
      localStorage.setItem('resultMovies', JSON.stringify(filtered));
    }
    function filterWithSwitch() {
      const filteredWithSwitch = allMovies.filter(
        (movie) =>
          movie.nameRU.toLowerCase().includes(request) && movie.duration <= SHORT_MOVIE_DURATION,
      );
      localStorage.setItem('resultMovies', JSON.stringify(filteredWithSwitch));
    }

    if (!isSwitched) {
      filterDefault();
    } else {
      filterWithSwitch();
    }

    return { filter: filterDefault, filterWithSwitch: filterWithSwitch };
  }

  const searchedMovies = JSON.parse(localStorage.getItem('resultMovies'));
  const [buttonShown, setButtonShown] = useState(false);
  const [moviesShown, setMoviesShown] = useState();

  function handleSubmitMovies(input) {
    localStorage.setItem('request', input);
    getMovies();
  }

  return (
    <main className='movies'>
      <SearchForm
        handleSubmit={handleSubmitMovies}
        switched={switched}
        setSwitched={setSwitched}
        savedResultMovies={savedResultMovies}
        savedRequest={savedRequest}
        setSavedRequest={setSavedRequest}
        clickSwitch={filterMovies}
      />
      {preloader ? <Preloader /> : null}
      {localStorage.getItem('resultMovies') ? (
        <MoviesCardList
          handleAddMovie={handleAddMovie}
          handleDeleteMovie={handleDeleteMovie}
          error={error}
          savedMovies={savedMovies}
          savedResultMovies={savedResultMovies}
          savedRequest={savedRequest}
          setSavedRequest={setSavedRequest}
          getSavedMovies={getSavedMovies}
          buttonShown={buttonShown}
          setButtonShown={setButtonShown}
          moviesShown={moviesShown}
          setMoviesShown={setMoviesShown}
          searchedMovies={searchedMovies}
        />
      ) : null}
    </main>
  );
}

export default Movies;
