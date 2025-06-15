import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getToken, getUserRole } from './utils/auth';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import ReportProblem from './pages/ReportProblem';
import ProblemsList from './pages/ProblemsList';
import HeadDashboard from './pages/HeadDashboard';
import UserDashboard from './pages/UserDashboard';
import HeadProblemsList from './pages/HeadProblemsList';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  const isLoggedIn = !!getToken();
  const userRole = getUserRole();

  return (
    <Router>
      <Header />
      <Routes>
        <Route 
          path="/" 
          element={
            isLoggedIn
              ? (userRole === 'head'
                  ? <Navigate to="/head" replace />
                  : <Navigate to="/dashboard" replace />
                )
              : <ProblemsList showLandingPage={true} />
          }
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/head/dashboard" 
          element={
            <ProtectedRoute role="head">
              <HeadDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/login" 
          element={
            isLoggedIn
              ? <Navigate to={userRole === 'head' ? '/head/dashboard' : '/dashboard'} replace />
              : <Login />
          }
        />
        <Route 
          path="/register" 
          element={
            isLoggedIn
              ? <Navigate to={userRole === 'head' ? '/head/dashboard' : '/dashboard'} replace />
              : <Register />
          }
        />
        <Route 
          path="/report" 
          element={
            <ProtectedRoute>
              <ReportProblem />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/head" 
          element={
            <ProtectedRoute role="head">
              <HeadDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/head/problems" 
          element={
            <ProtectedRoute role="head">
              <HeadProblemsList />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;