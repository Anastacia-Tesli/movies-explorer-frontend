import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate, useLocation } from 'react-router-dom';
import * as auth from '../../utils/AuthApi.js';
import { mainApi } from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import Header from '../Header/Header.js';
import Movies from '../pages/Movies/Movies';
import SavedMovies from '../pages/SavedMovies/SavedMovies';
import Profile from '../pages/Profile/Profile';
import Main from '../pages/Main/Main.js';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';
import NotFound from '../pages/NotFound/NotFound.js';
import Footer from '../Footer/Footer.js';
import Popup from '../UI/Popup/Popup.js';
import './App.css';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);

  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedResultMovies, setSavedResultMovies] = useState([]);
  const [switched, setSwitched] = useState(false);
  const [error, setError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');

  // Пользователь

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth
        .getUser(token)
        .then((res) => {
          if (res) {
            setCurrentUser(res);
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      auth
        .getUser(localStorage.getItem('jwt'))
        .then((info) => {
          setCurrentUser(info);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [loggedIn]);

  function handleRegister(name, email, password, setInactive) {
    setInactive(true);
    auth
      .register(name, email, password)
      .then((res) => {
        if (res.status !== 400) {
          handleLogin(email, password);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.includes(409)) {
          setRegisterError('Пользователь с таким email уже зарегистрирован');
        } else if (err.includes(400)) {
          setRegisterError('Переданы некорректные данные');
        } else setRegisterError('Что-то пошло не так...');
      })
      .finally(() => {
        setInactive(false);
      });
  }
  function handleLogin(email, password, setInactive) {
    setInactive(true);
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          setCurrentUser(data);
          navigate('/movies');
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.includes(401)) {
          setLoginError('Неправильные почта или пароль');
        } else setLoginError('Что-то пошло не так...');
      })
      .finally(() => {
        setInactive(false);
      });
  }

  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('request');
    localStorage.removeItem('resultMovies');
    localStorage.removeItem('switch');
    localStorage.removeItem('allMovies');
    setCurrentUser({});
    setMovies([]);
    setSavedMovies([]);
    setSavedResultMovies([]);
    setError('');
    setSwitched(false);
  }

  // Фильмы

  useEffect(() => {
    if (loggedIn)
      mainApi
        .getMovies()
        .then((res) => {
          setSavedMovies(res);
        })
        .catch((err) => {
          console.log(err);
          setError(
            'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
          );
        });
  }, [loggedIn]);

  function handleDeleteMovie(id) {
    mainApi
      .deleteMovie(id)
      .then(() => {
        setSavedMovies(
          savedMovies.filter((item) => {
            return item._id !== id;
          }),
        );
        return savedMovies;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddMovie(movie) {
    mainApi
      .addMovie(movie)
      .then((newMovie) => {
        setSavedMovies([...savedMovies, newMovie]);
        return savedMovies;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        {location.pathname === '/' ||
        location.pathname === '/movies' ||
        location.pathname === '/saved-movies' ||
        location.pathname === '/profile' ? (
          <Header
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            loggedIn={loggedIn}
          />
        ) : null}

        <Routes>
          <Route exact path='/' element={<Main />} />
          <Route
            exact
            path='/signin'
            element={<Login handleLogin={handleLogin} loginError={loginError} />}
          />
          <Route
            exact
            path='/signup'
            element={<Register handleRegister={handleRegister} registerError={registerError} />}
          />
          <Route path='/not-found' element={<NotFound />} />
          <Route path='*' element={<Navigate to='/not-found' />} />
          <Route
            exact
            path='/movies'
            element={
              <ProtectedRoute>
                <Movies
                  movies={movies}
                  setMovies={setMovies}
                  handleAddMovie={handleAddMovie}
                  handleDeleteMovie={handleDeleteMovie}
                  savedMovies={savedMovies}
                  savedResultMovies={savedResultMovies}
                />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/saved-movies'
            element={
              <ProtectedRoute>
                <SavedMovies
                  error={error}
                  handleAddMovie={handleAddMovie}
                  handleDeleteMovie={handleDeleteMovie}
                  switched={switched}
                  setSwitched={setSwitched}
                  savedMovies={savedMovies}
                  savedResultMovies={savedResultMovies}
                  setSavedResultMovies={setSavedResultMovies}
                />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile setCurrentUser={setCurrentUser} handleLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
        </Routes>

        {location.pathname === '/' ||
        location.pathname === '/movies' ||
        location.pathname === '/saved-movies' ? (
          <Footer />
        ) : null}
        <Popup open={open} onClick={() => setOpen(false)} loggedIn={loggedIn} />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
