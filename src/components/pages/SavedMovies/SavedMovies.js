import { useState } from 'react';
import SearchForm from '../../SearchForm/SearchForm';
import MoviesCardList from '../../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

function SavedMovies({
  handleAddMovie,
  handleDeleteMovie,
  savedMovies,
  savedResultMovies,
  savedRequest,
  setSavedRequest,
}) {
  const [request, setRequest] = useState('');

  return (
    <div className='saved-movies'>
      <SearchForm
        request={request}
        setRequest={setRequest}
        savedResultMovies={savedResultMovies}
        savedRequest={savedRequest}
        setSavedRequest={setSavedRequest}
      />
      <MoviesCardList
        savedMovies={savedMovies}
        handleAddMovie={handleAddMovie}
        handleDeleteMovie={handleDeleteMovie}
        savedResultMovies={savedResultMovies}
        savedRequest={savedRequest}
        setSavedRequest={setSavedRequest}
      />
    </div>
  );
}

export default SavedMovies;
