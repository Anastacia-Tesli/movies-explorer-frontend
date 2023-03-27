import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Popup from '../UI/Popup/Popup';
import Main from '../pages/Main/Main';
import Movies from '../pages/Movies/Movies';
import SavedMovies from '../pages/SavedMovies/SavedMovies';
import Profile from '../pages/Profile/Profile';
import './Content.css';

function Content({
  loggedIn,
  handleUpdateUser,
  handleLogout,
  error,
  handleAddMovie,
  handleDeleteMovie,
  request,
  setRequest,
  resultMovies,
  switched,
  setSwitched,
  savedMovies,
  savedResultMovies,
  savedRequest,
  setSavedRequest,
}) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  return (
    <>
      <Header
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        loggedIn={loggedIn}
      />
      <Routes>
        <Route exact path='/' element={<Main />} />
        <Route
          path='/movies'
          element={
            loggedIn ? (
              <Movies
                error={error}
                resultMovies={resultMovies}
                handleAddMovie={handleAddMovie}
                handleDeleteMovie={handleDeleteMovie}
                request={request}
                setRequest={setRequest}
                switched={switched}
                setSwitched={setSwitched}
                savedMovies={savedMovies}
                savedResultMovies={savedResultMovies}
                savedRequest={savedRequest}
                setSavedRequest={setSavedRequest}
              />
            ) : (
              <Navigate to='/' />
            )
          }
        />
        <Route
          path='/saved-movies'
          element={
            loggedIn ? (
              <SavedMovies
                handleAddMovie={handleAddMovie}
                handleDeleteMovie={handleDeleteMovie}
                switched={switched}
                setSwitched={setSwitched}
                savedMovies={savedMovies}
                savedResultMovies={savedResultMovies}
                savedRequest={savedRequest}
                setSavedRequest={setSavedRequest}
              />
            ) : (
              <Navigate to='/' />
            )
          }
        />
        <Route
          path='/profile'
          element={
            loggedIn ? (
              <Profile
                error={error}
                handleUpdateUser={handleUpdateUser}
                handleLogout={handleLogout}
              />
            ) : (
              <Navigate to='/' />
            )
          }
        />
      </Routes>
      {location.pathname === '/profile' ? null : <Footer />}
      <Popup open={open} onClick={() => setOpen(false)} loggedIn={loggedIn} />
    </>
  );
}

export default Content;
