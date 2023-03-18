import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <span className='footer__description'>Учебный проект Яндекс.Практикум х BeatFilm.</span>
      <div className='footer__info'>
        <div className='footer__collaborators'>
          <span className='footer__collaborator'>Яндекс.Практикум</span>
          <span className='footer__collaborator'>Github</span>
        </div>
        <span className='footer__copyright'>&copy; 2023</span>
      </div>
    </footer>
  );
}

export default Footer;
