import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import MoviesCard from '../MoviesCard/MoviesCard';
import ButtonMore from '../UI/ButtonMore/ButtonMore';
import {
  MOVIES_SHOWN_MOBILE,
  MOVIES_SHOWN_TABLET,
  MOVIES_SHOWN_DESK,
  MOVIES_SHOWN_FULLSCREEN,
  TABLET_WIDTH,
  DESK_WIDTH,
  FULLSCREEN_WIDTH,
  MOVIES_MORE_MOBILE,
  MOVIES_MORE_TABLET,
  MOVIES_MORE_DESK,
  MOVIES_MORE_FULLSCREEN,
} from '../../utils/constants';
import './MoviesCardList.css';

function MoviesCardList({
  handleAddMovie,
  handleDeleteMovie,
  error,
  savedMovies,
  savedRequest,
  savedResultMovies,
}) {
  const location = useLocation();
  const searchedMovies = JSON.parse(localStorage.getItem('resultMovies'));
  const [buttonShown, setButtonShown] = useState(false);
  const [moviesShown, setMoviesShown] = useState(MOVIES_SHOWN_FULLSCREEN);

  useEffect(() => {
    if (location.pathname === '/movies') {
      if (window.innerWidth < TABLET_WIDTH) {
        setMoviesShown(MOVIES_SHOWN_MOBILE);
      } else if (window.innerWidth < DESK_WIDTH) {
        setMoviesShown(MOVIES_SHOWN_TABLET);
      } else if (window.innerWidth < FULLSCREEN_WIDTH) {
        setMoviesShown(MOVIES_SHOWN_DESK);
      } else if (window.innerWidth >= FULLSCREEN_WIDTH) {
        setMoviesShown(MOVIES_SHOWN_FULLSCREEN);
      }
      if (searchedMovies.length > moviesShown) {
        setButtonShown(true);
      }
      if (searchedMovies.length <= moviesShown || searchedMovies.length === 0) {
        setButtonShown(false);
      }
    }
  }, []);

  useEffect(() => {
    if (location.pathname === '/movies') {
      if (searchedMovies.length > moviesShown) {
        setButtonShown(true);
      }
      if (searchedMovies.length <= moviesShown || searchedMovies.length === 0) {
        setButtonShown(false);
      }
    }
  }, [moviesShown, searchedMovies]);

  function handleMore() {
    if (window.innerWidth < TABLET_WIDTH) {
      setMoviesShown(moviesShown + MOVIES_MORE_MOBILE);
      if (searchedMovies.length <= moviesShown + MOVIES_MORE_MOBILE) {
        setButtonShown(false);
      }
    } else if (window.innerWidth < DESK_WIDTH) {
      setMoviesShown(moviesShown + MOVIES_MORE_TABLET);
      if (searchedMovies.length <= moviesShown + MOVIES_MORE_TABLET) {
        setButtonShown(false);
      }
    } else if (window.innerWidth < FULLSCREEN_WIDTH) {
      setMoviesShown(moviesShown + MOVIES_MORE_DESK);
      if (searchedMovies.length <= moviesShown + MOVIES_MORE_DESK) {
        setButtonShown(false);
      }
    } else if (window.innerWidth >= FULLSCREEN_WIDTH) {
      setMoviesShown(moviesShown + MOVIES_MORE_FULLSCREEN);
      if (searchedMovies.length <= moviesShown + MOVIES_MORE_FULLSCREEN) {
        setButtonShown(false);
      }
    }
  }

  return (
    <section className='movies-list'>
      <ul className='movies-list__items'>
        {error ? (
          <p className='movies-list__error'>{error}</p>
        ) : location.pathname === '/movies' && searchedMovies.length > 0 ? (
          searchedMovies.slice(0, moviesShown).map((card) => {
            return (
              <li className='movies-list__item'>
                <MoviesCard
                  movie={card}
                  addMovie={handleAddMovie}
                  deleteMovie={handleDeleteMovie}
                  key={card.nameEN}
                  title={card.nameRU}
                  trailer={card.trailerLink}
                  image={`https://api.nomoreparties.co/${card.image.url}`}
                  duration={card.duration}
                  savedMovies={savedMovies}
                />
              </li>
            );
          })
        ) : location.pathname === '/movies' && searchedMovies.length === 0 ? (
          <p className='movies-list__error'>Ничего не найдено</p>
        ) : location.pathname === '/saved-movies' &&
          savedRequest &&
          savedResultMovies.length > 0 ? (
          savedResultMovies.map((card) => (
            <li className='movies-list__item'>
              <MoviesCard
                movie={card}
                addMovie={handleAddMovie}
                deleteMovie={handleDeleteMovie}
                key={card.nameEN}
                title={card.nameRU}
                trailer={card.trailerLink}
                image={card.image}
                duration={card.duration}
                savedMovies={savedMovies}
              />
            </li>
          ))
        ) : location.pathname === '/saved-movies' &&
          savedRequest &&
          savedResultMovies.length === 0 ? (
          <p className='movies-list__error'>Ничего не найдено</p>
        ) : location.pathname === '/saved-movies' && !savedRequest ? (
          savedMovies.map((card) => (
            <li className='movies-list__item'>
              <MoviesCard
                movie={card}
                addMovie={handleAddMovie}
                deleteMovie={handleDeleteMovie}
                key={card.nameEN}
                title={card.nameRU}
                trailer={card.trailerLink}
                image={card.image}
                duration={card.duration}
                savedMovies={savedMovies}
              />
            </li>
          ))
        ) : null}
      </ul>
      {location.pathname === '/movies' ? (
        <div
          className={`${
            buttonShown && !error ? 'movies-list__button' : 'movies-list__button_display_none'
          } `}
        >
          <ButtonMore onClick={() => handleMore()} />
        </div>
      ) : null}
    </section>
  );
}

export default MoviesCardList;
