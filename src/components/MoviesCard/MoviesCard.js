import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({ title, image, duration }) {
  const location = useLocation();
  const [liked, setLiked] = useState(false);
  return (
    <div className='movie'>
      <img className='movie__image' src={image} alt={title} />
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
            onClick={() => (!liked ? setLiked(true) : setLiked(false))}
          />
        </div>
        <span className='movie__duration'>{duration}</span>
      </div>
    </div>
  );
}

export default MoviesCard;
