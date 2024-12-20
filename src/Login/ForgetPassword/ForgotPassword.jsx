import React, { useState } from 'react';
import '../PasswordReset/PasswordReset.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate email
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    setError('');
    setMessage('Password reset link has been sent to your email.');
    // Here, you can make an API call to send the reset link.
  };

  return (
    <div className="password-reset-container">
      <h2>Forgot Password</h2>
      <p>Please enter your email address to receive a password reset link.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Send Reset Link</button>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
      </form>
    </div>
  );
}

export default ForgotPassword;
