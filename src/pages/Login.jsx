import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import config from '../config/config';
import { saveUserData, getToken } from '../utils/auth';
import './login.css'

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const location = useLocation();
  const {  action, problemId } = location.state || {};

  useEffect(() => {
    const token = getToken();
    if (token) {
      // User is already logged in, redirect based on role
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLoginSuccess = () => {
    if (action === 'vote' && problemId) {
      navigate('/', { state: { voteFor: problemId } });
    } else if (action === 'report') {
      navigate('/report');
    } else {
      navigate('/');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (data.token) {
        saveUserData(data.token, data.role);
        
        // Redirect based on user role
        if (data.role === 'head') {
          navigate('/head/dashboard', { replace: true });
        } else {
          handleLoginSuccess();
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Welcome Back</h2>
        <p className="login-message">
          {action === 'vote' ? 'Login to vote on problems' : 'Login to report an issue'}
        </p>
        <div className="input-group">
          <input 
            name="username" 
            placeholder="Username" 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="input-group">
          <input 
            name="password" 
            type="password" 
            placeholder="Password" 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="register-link">
          Don't have an account? <a href="/register">Register here</a>
        </div>
        <button type="submit" className="login-button">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
