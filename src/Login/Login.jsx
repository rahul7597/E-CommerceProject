import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:1111/login', {
      email,
      password
    })
    .then((response) => {
      
      setSuccess('Login successful!');
      setError(null);
    })
    .catch((error) => {
      setError('Invalid email or password.');
      setSuccess(null);
    });
  };

  return (
    <div className="login-page">
      <div className="login-header">
        <h1>Login</h1>
        <p>Welcome back!</p>
      </div>
      <div className="login-content">
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
      </div>
      <div className="login-footer">
        <p>&copy; 2023 Example Company. All rights reserved.</p>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        <p>
          Forgot password? <Link to="/forgot-password">Forgot Password</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

