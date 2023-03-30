import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Popup from '../UI/Popup/Popup';
import Main from '../pages/Main/Main';
import Movies from '../pages/Movies/Movies';
import SavedMovies from '../pages/SavedMovies/SavedMovies';
import Profile from '../pages/Profile/Profile';
import NotFound from '../pages/NotFound/NotFound';
import './Content.css';

function Content({
  loggedIn,
  handleUpdateUser,
  handleLogout,
  error,
  profileError,
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
  getAllMovies,
  preloader,
  getSavedMovies,
}) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  return (
    <>
      {location.pathname === '/not-found' ? null : (
        <Header
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          loggedIn={loggedIn}
        />
      )}
      <Routes>
        <Route exact path='/' element={<Main />} />
        <Route
          path='/movies'
          element={
            loggedIn ? (
              <Movies
                getAllMovies={getAllMovies}
                getSavedMovies={getSavedMovies}
                preloader={preloader}
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
                getSavedMovies={getSavedMovies}
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
                profileError={profileError}
                handleUpdateUser={handleUpdateUser}
                handleLogout={handleLogout}
              />
            ) : (
              <Navigate to='/' />
            )
          }
        />
        <Route path='/not-found' element={<NotFound />} />
        <Route path='*' element={<Navigate to='/not-found' />} />
      </Routes>

      {location.pathname === '/profile' || location.pathname === '/not-found' ? null : <Footer />}
      <Popup open={open} onClick={() => setOpen(false)} loggedIn={loggedIn} />
    </>
  );
}

export default Content;
