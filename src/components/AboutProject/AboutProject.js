import './AboutProject.css';

function AboutProject() {
  return (
    <section className='about' id='about'>
      <h2 className='about__section-title'>О&nbsp;проекте</h2>
      <div className='about__section-flex'>
        <div className='about__section-group'>
          <h3 className='about__section-subtitle'>Дипломный проект включал 5&nbsp;этапов</h3>
          <p className='about__section-text'>
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности
            и&nbsp;финальные доработки.
          </p>
        </div>
        <div className='about__section-group'>
          <h3 className='about__section-subtitle'>На выполнение диплома ушло 5&nbsp;недель</h3>
          <p className='about__section-text'>
            У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать,
            чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className='about__blocks'>
        <div className='about__block'>
          <span className='about__span-accent about__span-accent_type_dark'>1 неделя</span>
          <span className='about__span'>Back-end</span>
        </div>
        <div className='about__block'>
          <span className='about__span-accent about__span-accent_type_light'>4 недели</span>
          <span className='about__span'>Front-end</span>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
