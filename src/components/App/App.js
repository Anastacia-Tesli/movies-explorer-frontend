import { Route, Routes } from 'react-router-dom';
import Content from '../Content/Content';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';
import NotFound from '../pages/NotFound/NotFound';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route exact path='*' element={<Content />} />
        <Route exact path='/signin' element={<Login />} />
        <Route exact path='/signup' element={<Register />} />
        <Route exact path='/not-found' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
