import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getToken, logout, getUserRole } from '../utils/auth';
import './header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = getToken();
  const role = getUserRole();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const navigateToSection = (sectionId) => {
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 60, // Adjust for header height
          behavior: 'smooth'
        });
      }
    } else {
      navigate('/', {
        state: { scrollTo: sectionId },
        replace: true
      });
    }
  };

  

  return (
    <header className="header">
      <Link to={role === 'head' ? '/head' : '/'} className="header-title">
        Community Reporter
      </Link>
      <nav className="header-nav">
        {!isLoggedIn ? (
          <>
            <button onClick={() => navigateToSection('problems')} className="header-link">Problems</button>
            <button onClick={() => navigateToSection('features')} className="header-link">Features</button>
            <Link to="/login" className="header-link">Login</Link>
            <Link to="/register" className="header-link">Register</Link>
          </>
        ) : role === 'head' ? (
          <>
            <Link to="/head" className="header-link">Head Dashboard</Link>
            <Link to="/head/problems" className="header-link">Community Problems</Link>
            <button onClick={handleLogout} className="header-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="header-link">All Problems</Link>
            <Link to="/report" className="header-link">Report Problem</Link>
            <button onClick={handleLogout} className="header-button">Logout</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
