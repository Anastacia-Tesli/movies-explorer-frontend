import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  if (!localStorage.getItem('jwt')) {
    return <Navigate to='/' />;
  }
  return children;
}

export default ProtectedRoute;
