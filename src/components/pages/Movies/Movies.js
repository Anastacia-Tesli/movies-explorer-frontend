import { useState, useEffect } from 'react';
import { moviesApi } from '../../../utils/MoviesApi';
import SearchForm from '../../SearchForm/SearchForm';
import MoviesCardList from '../../MoviesCardList/MoviesCardList';
import Preloader from '../../UI/Preloader/Preloader';
import './Movies.css';

function Movies({
  movies,
  setMovies,
  resultMovies,
  setResultMovies,
  handleAddMovie,
  handleDeleteMovie,
  request,
  setRequest,
  switched,
  setSwitched,
  savedMovies,
  savedResultMovies,
  savedRequest,
  setSavedRequest,
  getSavedMovies,
}) {
  const [preloader, setPreloader] = useState(false);

  const [error, setError] = useState('');

  function getAllMovies() {
    setPreloader(true);
    moviesApi
      .getMovies()
      .then((res) => {
        setMovies(res);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
        setError(
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
        );
      })
      .finally(() => setPreloader(false));
  }

  return (
    <main className='movies'>
      <SearchForm
        getAllMovies={getAllMovies}
        resultMovies={resultMovies}
        request={request}
        setRequest={setRequest}
        switched={switched}
        setSwitched={setSwitched}
        savedResultMovies={savedResultMovies}
        savedRequest={savedRequest}
        setSavedRequest={setSavedRequest}
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
        />
      ) : null}
    </main>
  );
}

export default Movies;
