import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import * as auth from '../../utils/AuthApi.js';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import Content from '../Content/Content';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';
import NotFound from '../pages/NotFound/NotFound';
import './App.css';

function App() {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const [movies, setMovies] = useState([]);
  const [resultMovies, setResultMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedResultMovies, setSavedResultMovies] = useState([]);
  const [switched, setSwitched] = useState(false);
  const [error, setError] = useState('');

  const [request, setRequest] = useState('');
  const [savedRequest, setSavedRequest] = useState('');

  // Пользователь
  const navigate = useNavigate();

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

  function handleRegister(name, email, password) {
    auth
      .register(name, email, password)
      .then((res) => {
        if (res.status !== 400) {
          handleLogin(email, password);
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setError('Что-то пошло не так!...');
      });
  }
  function handleLogin(email, password) {
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
        console.log(`Ошибка: ${err}`);
        setError('Что-то пошло не так...');
      });
  }

  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem('resultMovies');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('request');
    localStorage.removeItem('switch');
    localStorage.removeItem('jwt');
    setCurrentUser({});
    setMovies([]);
    setResultMovies([]);
    setSavedMovies([]);
    setSwitched(false);
  }

  function handleUpdateUser(name, email) {
    mainApi
      .updateUser(name, email)
      .then((info) => {
        setCurrentUser(info);
        setError('Данные профиля успешно обновлены!');
      })
      .catch((err) => {
        setError('Профиль не обновился. Что-то пошло не так...');
        console.log(`Ошибка: ${err}`);
      });
  }
  // Фильмы

  useEffect(() => {
    moviesApi
      .getMovies()
      .then((res) => {
        setMovies(res);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
        setError(
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
        );
      });
  }, [movies]);

  useEffect(() => {
    const filtered = movies.filter((movie) => movie.nameRU.toLowerCase().includes(request));
    const filteredWithSwitch = movies.filter(
      (movie) => movie.nameRU.toLowerCase().includes(request) && movie.duration <= 40,
    );
    if (switched) {
      setResultMovies(filteredWithSwitch);
    } else {
      setResultMovies(filtered);
    }
  }, [movies, request, switched]);

  useEffect(() => {
    mainApi
      .getMovies()
      .then((res) => {
        setSavedMovies(res);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
        setError(
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
        );
      });
  }, [savedMovies]);

  useEffect(() => {
    const filtered = savedMovies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(savedRequest),
    );
    const filteredWithSwitch = savedMovies.filter(
      (movie) => movie.nameRU.toLowerCase().includes(savedRequest) && movie.duration <= 40,
    );
    if (switched) {
      setSavedResultMovies(filteredWithSwitch);
    } else {
      setSavedResultMovies(filtered);
    }
  }, [savedMovies, savedRequest, switched]);

  function handleDeleteMovie(id) {
    mainApi
      .deleteMovie(id)
      .then(() => {
        setMovies(
          savedMovies.filter((item) => {
            return item._id !== id;
          }),
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleAddMovie(movie) {
    mainApi
      .addMovie(movie)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
        localStorage.setItem(newMovie.nameRU, newMovie._id);
        return newMovie;
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            exact
            path='*'
            element={
              <Content
                request={request}
                setRequest={setRequest}
                savedRequest={savedRequest}
                setSavedRequest={setSavedRequest}
                switched={switched}
                setSwitched={setSwitched}
                resultMovies={resultMovies}
                loggedIn={loggedIn}
                handleUpdateUser={handleUpdateUser}
                handleLogout={handleLogout}
                error={error}
                movies={movies}
                setMovies={setMovies}
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
                savedResultMovies={savedResultMovies}
                handleAddMovie={handleAddMovie}
                handleDeleteMovie={handleDeleteMovie}
              />
            }
          />
          <Route exact path='/signin' element={<Login handleLogin={handleLogin} error={error} />} />
          <Route
            exact
            path='/signup'
            element={<Register handleRegister={handleRegister} error={error} />}
          />
          <Route exact path='/not-found' element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
