import PageTitle from '../../UI/PageTitle/PageTitle';
import './Profile.css';

function Profile() {
  const userName = 'Василий';
  const userEmail = 'pochta@yandex.ru';
  return (
    <div className='profile'>
      <div className='profile__main'>
        <PageTitle title={`Привет, ${userName}!`} />
        <div className='profile__info'>
          <div className='profile__item'>
            <span className='profile__span'>Имя</span>
            <span>{userName}</span>
          </div>
          <div className='profile__item'>
            <span className='profile__span'>E-mail</span>
            <span>{userEmail}</span>
          </div>
        </div>
      </div>
      <div className='profile__buttons'>
        <button className='profile__button' type='button'>
          Редактировать
        </button>
        <button className='profile__button' type='button'>
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}

export default Profile;
