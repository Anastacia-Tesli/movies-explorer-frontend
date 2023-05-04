import { useState, useEffect } from 'react';
import SearchForm from '../../SearchForm/SearchForm';
import MoviesCardList from '../../MoviesCardList/MoviesCardList';
import { SHORT_MOVIE_DURATION } from '../../../utils/constants';
import './SavedMovies.css';

function SavedMovies({
  handleAddMovie,
  handleDeleteMovie,
  savedMovies,
  savedResultMovies,
  switched,
  setSwitched,
  getSavedMovies,
  setSavedResultMovies,
}) {
  const [request, setRequest] = useState('');
  const [savedRequest, setSavedRequest] = useState('');
  function handleSubmitSavedMovies(input) {
    setSavedRequest(input);
  }
  useEffect(() => {
    const filtered = savedMovies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(savedRequest),
    );
    const filteredWithSwitch = savedMovies.filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(savedRequest) && movie.duration <= SHORT_MOVIE_DURATION,
    );
    if (switched) {
      setSavedResultMovies(filteredWithSwitch);
    } else {
      setSavedResultMovies(filtered);
    }
  }, [savedMovies, savedRequest, switched]);
  return (
    <div className='saved-movies'>
      <SearchForm
        handleSubmit={handleSubmitSavedMovies}
        request={request}
        setRequest={setRequest}
        savedResultMovies={savedResultMovies}
        savedRequest={savedRequest}
        setSavedRequest={setSavedRequest}
        switched={switched}
        setSwitched={setSwitched}
      />
      <MoviesCardList
        getSavedMovies={getSavedMovies}
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
