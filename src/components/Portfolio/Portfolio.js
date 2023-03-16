import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h3 className='portfolio__section-title'>Портфолио</h3>
      <ul className='portfolio__links'>
        <li>
          <a
            className='portfolio__link'
            target='_blank'
            rel='noreferrer noopener'
            href='https://github.com/Anastacia-Tesli/kuda-ya-poedu'
          >
            Статичный сайт
            <div className='portfolio__arrow' />
          </a>
        </li>
        <li>
          <a
            className='portfolio__link'
            target='_blank'
            rel='noreferrer noopener'
            href='https://github.com/Anastacia-Tesli/russian-travel'
          >
            Адаптивный сайт
            <div className='portfolio__arrow' />
          </a>
        </li>
        <li>
          <a
            className='portfolio__link'
            target='_blank'
            rel='noreferrer noopener'
            href='https://github.com/Anastacia-Tesli/mesto-react'
          >
            Одностраничное приложение
            <div className='portfolio__arrow' />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
