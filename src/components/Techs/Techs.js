import './Techs.css';

function Techs() {
  return (
    <section className='tech' id='tech'>
      <h2 className='tech__section-title'>Технологии</h2>
      <h3 className='tech__section-accent'>7&nbsp;технологий</h3>
      <p className='tech__section-text'>
        На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили в&nbsp;дипломном
        проекте.
      </p>
      <div className='tech__skills'>
        <div className='tech__skill'>HTML</div>
        <div className='tech__skill'>CSS</div>
        <div className='tech__skill'>JS</div>
        <div className='tech__skill'>React</div>
        <div className='tech__skill'>Git</div>
        <div className='tech__skill'>Express.js</div>
        <div className='tech__skill'>mongoDB</div>
      </div>
    </section>
  );
}

export default Techs;
