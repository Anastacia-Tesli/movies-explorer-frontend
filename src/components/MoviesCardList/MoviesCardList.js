import { useState } from 'react';
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
  moviesShown,
  searchedMovies,
  handleMore,
  buttonShown,
}) {
  const location = useLocation();

  return (
    <section className='movies-list'>
      <ul className='movies-list__items'>
        {location.pathname === '/movies' && error ? (
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
          className={`${buttonShown ? 'movies-list__button' : 'movies-list__button_display_none'}`}
        >
          <ButtonMore onClick={handleMore} />
        </div>
      ) : null}
    </section>
  );
}

export default MoviesCardList;
