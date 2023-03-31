import { useState, useContext, useEffect } from 'react';
import { mainApi } from '../../../utils/MainApi';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import PageTitle from '../../UI/PageTitle/PageTitle';
import './Profile.css';

function Profile({ handleLogout, setCurrentUser }) {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileError, setProfileError] = useState('');
  const [disabled, setDisabled] = useState(true);
  const user = useContext(CurrentUserContext);
  useEffect(() => {
    if (name !== user.name || email !== user.email) {
      setDisabled(false);
    }
    if (name === user.name && email === user.email) {
      setDisabled(true);
    }
  }, [name, email, setDisabled]);

  useEffect(() => {
    setName(user ? user.name : '');
    setEmail(user ? user.email : '');
  }, [user]);
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleUpdateUser(name, email) {
    mainApi
      .updateUser(name, email)
      .then((info) => {
        setCurrentUser(info);
        setProfileError('Данные профиля успешно обновлены!');
      })
      .catch((err) => {
        setProfileError('Профиль не обновился. Что-то пошло не так...');
        console.log(`Ошибка: ${err}`);
      });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (name !== user.name || email !== user.email) {
      handleUpdateUser(name, email);
    }
  }

  return (
    <form className='profile' onSubmit={handleSubmit}>
      <div className='profile__main'>
        <PageTitle title={`Привет, ${user.name}!`} />
        <div className='profile__info'>
          <div className='profile__item'>
            <span className='profile__span'>Имя</span>
            {editMode ? (
              <input className='profile__input' value={name || ''} onChange={handleNameChange} />
            ) : (
              <span className='profile__input'>{name}</span>
            )}
          </div>
          <div className='profile__item'>
            <span className='profile__span'>E-mail</span>
            {editMode ? (
              <input className='profile__input' value={email || ''} onChange={handleEmailChange} />
            ) : (
              <span className='profile__input'>{email}</span>
            )}
          </div>
        </div>
        <span className='profile__error'>{profileError}</span>
      </div>
      {editMode ? (
        <button
          className='profile__save-button'
          type='submit'
          disabled={disabled}
          onClick={(e) => {
            handleSubmit(e);
            setEditMode(false);
          }}
        >
          Сохранить
        </button>
      ) : (
        <div className='profile__buttons'>
          <button className='profile__button' type='button' onClick={() => setEditMode(true)}>
            Редактировать
          </button>
          <button className='profile__button' type='button' onClick={() => handleLogout()}>
            Выйти из аккаунта
          </button>
        </div>
      )}
    </form>
  );
}

export default Profile;
