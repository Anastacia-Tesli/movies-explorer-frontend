import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import MoviesCard from '../MoviesCard/MoviesCard';
import ButtonMore from '../UI/ButtonMore/ButtonMore';
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
  const [moviesShown, setMoviesShown] = useState(12);
  useEffect(() => {
    if (searchedMovies) {
      if (searchedMovies.length <= moviesShown || searchedMovies.length === 0) {
        setButtonShown(false);
      }
      if (window.innerWidth < 600) {
        if (searchedMovies.length > 5) {
          setButtonShown(true);
          setMoviesShown(5);
        }
      } else if (window.innerWidth < 938) {
        if (searchedMovies.length > 8) {
          setButtonShown(true);
          setMoviesShown(8);
        }
      } else if (window.innerWidth < 1234) {
        if (searchedMovies.length > 9) {
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
  }, []);

  function handleMore() {
    if (window.innerWidth < 600) {
      setMoviesShown(moviesShown + 1);
      if (searchedMovies.length <= moviesShown + 1) {
        setButtonShown(false);
      }
    } else if (window.innerWidth < 938) {
      setMoviesShown(moviesShown + 2);
      if (searchedMovies.length <= moviesShown + 2) {
        setButtonShown(false);
      }
    } else if (window.innerWidth < 1234) {
      setMoviesShown(moviesShown + 3);
      if (searchedMovies.length <= moviesShown + 3) {
        setButtonShown(false);
      }
    } else if (window.innerWidth >= 1234) {
      setMoviesShown(moviesShown + 4);
      if (searchedMovies.length <= moviesShown + 4) {
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
        ) : location.pathname === '/saved-movies' && savedRequest ? (
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
