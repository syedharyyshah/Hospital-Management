import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '../main';

const ProtectedRoute = ({ element: Element }) => {
  const { isAuthenticated } = useContext(Context);

  if (!isAuthenticated) {
    // User not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  // User authenticated, render the element
  return <Element />;
};

export default ProtectedRoute;