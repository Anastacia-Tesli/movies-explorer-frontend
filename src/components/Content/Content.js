import { Route, Routes, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Popup from '../UI/Popup/Popup';
import Main from '../pages/Main/Main';
import Movies from '../pages/Movies/Movies';
import SavedMovies from '../pages/SavedMovies/SavedMovies';
import Profile from '../pages/Profile/Profile';
import './Content.css';

function Content() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  return (
    <>
      <Header open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)} />
      <Routes>
        <Route exact path='/' element={<Main />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/saved-movies' element={<SavedMovies />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      {location.pathname === '/profile' ? null : <Footer />}
      <Popup open={open} onClick={() => setOpen(false)} />
    </>
  );
}

export default Content;
