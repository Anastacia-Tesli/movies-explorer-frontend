import './AboutMe.css';
import photo from '../../images/photo.png';

function AboutMe() {
  return (
    <section className='student' id='student'>
      <h2 className='student__section-title'>Студент</h2>
      <div className='student__section-flex'>
        <img className='student__photo' alt='Фото студента' src={photo} />
        <div className='student__section-group'>
          <div className='student__info'>
            <h3 className='student__section-accent'>Анастасия</h3>
            <span className='student__section-text student__section-text_type_span'>
              Фронтенд-разработчик, 26 лет
            </span>
            <p className='student__section-text'>
              Почти всю жизнь проживаю в&nbsp;Подмосковье, имею высшее фармацевтическое образование.
              Продолжительное время работала редактором-переводчиком по&nbsp;медицинской
              и&nbsp;научной тематике. Помимо основного курса по&nbsp;веб-разработке активно
              участвую в&nbsp;сторонних проектах.
            </p>
          </div>
          <span className='student__platform'>Github</span>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
