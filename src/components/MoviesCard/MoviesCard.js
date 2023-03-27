import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({ movie, addMovie, deleteMovie, title, trailer, image, duration }) {
  const location = useLocation();
  const [liked, setLiked] = useState(localStorage.getItem(title) ? true : false);

  function handleMovie(evt) {
    const itemToDelete = localStorage.getItem(title);
    evt.preventDefault();
    if (location.pathname === '/movies') {
      if (!liked) {
        setLiked(true);
        addMovie(movie);
      } else {
        setLiked(false);
        localStorage.removeItem(title);
        deleteMovie(itemToDelete);
      }
    }
    if (location.pathname === '/saved-movies') {
      localStorage.removeItem(title);
      deleteMovie(movie._id);
    }
  }

  return (
    <div className='movie'>
      <a href={trailer} target='_blank' rel='noopener noreferrer'>
        <img className='movie__image' src={image} alt={title} />
      </a>
      <div className='movie__item'>
        <div className='movie__main'>
          <h2 className='movie__title'>{title}</h2>
          <button
            className={`movie__button ${
              location.pathname === '/movies'
                ? `movie__like-button ${liked ? 'movie__button_active' : ''}`
                : 'movie__delete-button'
            }`}
            type='button'
            onClick={handleMovie}
          />
        </div>
        <span className='movie__duration'>
          {duration > 59 ? `${Math.floor(duration / 60)} ч` : null}{' '}
          {duration > 59 ? `${duration - Math.floor(duration / 60) * 60} ` : duration}м
        </span>
      </div>
    </div>
  );
}

export default MoviesCard;
