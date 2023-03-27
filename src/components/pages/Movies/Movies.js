import { useState } from 'react';
import SearchForm from '../../SearchForm/SearchForm';
import MoviesCardList from '../../MoviesCardList/MoviesCardList';
import Preloader from '../../UI/Preloader/Preloader';
import './Movies.css';

function Movies({
  handleAddMovie,
  handleDeleteMovie,
  error,
  request,
  setRequest,
  resultMovies,
  switched,
  setSwitched,
  savedMovies,
  savedResultMovies,
  savedRequest,
  setSavedRequest,
}) {
  const searchedMovies = JSON.parse(localStorage.getItem('resultMovies'));
  const [buttonShown, setButtonShown] = useState(false);
  const [moviesShown, setMoviesShown] = useState(12);

  function handleMovies() {
    if (searchedMovies.length <= moviesShown) {
      setButtonShown(false);
    }
    if (window.innerWidth < 600) {
      if (searchedMovies.length > 5) {
        setButtonShown(true);
        setMoviesShown(5);
      }
    } else if (window.innerWidth < 938) {
      if (searchedMovies.length > 12) {
        setButtonShown(true);
        setMoviesShown(8);
      }
    } else if (window.innerWidth < 1234) {
      if (searchedMovies.length > 12) {
        setButtonShown(true);
        setMoviesShown(9);
      }
    } else if (window.innerWidth >= 1234) {
      if (searchedMovies.length > 12) {
        setButtonShown(true);
        setMoviesShown(12);
      }
    }
  }
  function handleMore() {
    if (window.innerWidth < 600) {
      setMoviesShown(moviesShown + 1);
    } else if (window.innerWidth < 938) {
      setMoviesShown(moviesShown + 2);
    } else if (window.innerWidth < 1234) {
      setMoviesShown(moviesShown + 3);
    } else if (window.innerWidth >= 1234) {
      setMoviesShown(moviesShown + 4);
    }
  }

  return (
    <main className='movies'>
      <SearchForm
        resultMovies={resultMovies}
        request={request}
        setRequest={setRequest}
        switched={switched}
        setSwitched={setSwitched}
        savedResultMovies={savedResultMovies}
        savedRequest={savedRequest}
        setSavedRequest={setSavedRequest}
        handleMovies={handleMovies}
      />
      {!localStorage.getItem('request') ? (
        <Preloader />
      ) : (
        <MoviesCardList
          handleAddMovie={handleAddMovie}
          handleDeleteMovie={handleDeleteMovie}
          error={error}
          savedMovies={savedMovies}
          savedResultMovies={savedResultMovies}
          savedRequest={savedRequest}
          setSavedRequest={setSavedRequest}
          moviesShown={moviesShown}
          searchedMovies={searchedMovies}
          handleMore={handleMore}
          buttonShown={buttonShown}
        />
      )}
    </main>
  );
}

export default Movies;
