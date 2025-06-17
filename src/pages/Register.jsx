import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config/config';
import './register.css';

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '', role: 'citizen' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(''); // Clear error when user makes changes
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      navigate('/login');
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h2>Register</h2>
        
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

        <div className="input-group">
          <select name="role" onChange={handleChange} value={form.role}>
            <option value="citizen">Citizen</option>
            <option value="head">Head</option>
          </select>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
