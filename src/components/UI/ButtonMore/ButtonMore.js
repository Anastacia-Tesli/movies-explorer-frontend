import './ButtonMore.css';

function ButtonMore({ onClick }) {
  return (
    <button className='button-more' onClick={onClick}>
      Еще
    </button>
  );
}

export default ButtonMore;
