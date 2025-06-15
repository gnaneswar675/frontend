import { Navigate } from 'react-router-dom';
import { getToken, getUserRole } from '../utils/auth';

const ProtectedRoute = ({ children, role }) => {
  const isLoggedIn = !!getToken();
  const userRole = getUserRole();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Prevent head users from accessing regular user routes
  if (userRole === 'head' && !role) {
    return <Navigate to="/head/dashboard" />;
  }

  // Check for head-only routes
  if (role === 'head' && userRole !== 'head') {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;
