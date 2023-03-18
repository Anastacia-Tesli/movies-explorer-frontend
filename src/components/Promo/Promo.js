import './Promo.css';

function Promo() {
  const about = document.querySelector('.about');
  const tech = document.querySelector('.tech');
  const student = document.querySelector('.student');

  return (
    <div className='promo'>
      <h1 className='promo__title'>Учебный проект студента факультета Веб&#8209;разработки.</h1>
      <div className='promo__links'>
        <div className='promo__link' onClick={() => about.scrollIntoView({ behavior: 'smooth' })}>
          О проекте
        </div>
        <div className='promo__link' onClick={() => tech.scrollIntoView({ behavior: 'smooth' })}>
          Технологии
        </div>
        <div className='promo__link' onClick={() => student.scrollIntoView({ behavior: 'smooth' })}>
          Студент
        </div>
      </div>
    </div>
  );
}

export default Promo;
