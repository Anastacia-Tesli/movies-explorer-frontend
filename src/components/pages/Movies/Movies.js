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
  getAllMovies,
  preloader,
  getSavedMovies,
}) {
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
