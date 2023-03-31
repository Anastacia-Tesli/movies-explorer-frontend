import { Navigate } from 'react-router-dom';

function ProtectedRoute({ loggedIn, children }) {
  if (!loggedIn) {
    <Navigate to='/' replace />;
  }
  return children;
}

export default ProtectedRoute;
