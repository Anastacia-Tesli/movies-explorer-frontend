import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import { cardList, cardSavedList } from '../../utils/constants';
import './MoviesCardList.css';

function MoviesCardList() {
  const location = useLocation();
  return (
    <section className='movies-list'>
      <ul className='movies-list__items'>
        {location.pathname === '/movies'
          ? cardList.map((card) => (
              <li className='movies-list__item'>
                <MoviesCard
                  key={card.title}
                  title={card.title}
                  image={card.image}
                  duration={card.duration}
                />
              </li>
            ))
          : cardSavedList.map((card) => (
              <li className='movies-list__item'>
                <MoviesCard
                  key={card.title}
                  title={card.title}
                  image={card.image}
                  duration={card.duration}
                />
              </li>
            ))}
      </ul>
    </section>
  );
}

export default MoviesCardList;
