import React, { useState } from 'react';
import './RegistrationPage.css';

function RegistrationPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState(''); // State for the number field
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (name === '' || email === '' || password === '' || number === '') {
      setError('Please fill in all fields.');
      setSuccess(null);
      return;
    }

    const userData = {
      name,
      email,
      password,
      number,
    };

    try {
      // Simulate API call (Replace with your actual API endpoint)
      const response = await fetch('https://ecommerce-spring-react-app-4e1b67b4ade1.herokuapp.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Successful registration
        setSuccess('Registration successful!');
        setError(null);
      } else {
        // API returned an error (validation issues, etc.)
        setError(data.message || 'Registration failed. Please try again.');
        setSuccess(null);
      }
    } catch (error) {
      // Handle network errors or unexpected issues
      setError('Something went wrong. Please try again later.');
      setSuccess(null);
    }
  };

  return (
    <div className="registration-page">
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        
        <label htmlFor="number">Number:</label>
        <input
          type="number"
          id="number"
          name="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)} // Handle number input separately
        />
        <br />
        
        <button type="submit">Register</button>
        
        {/* Error and success messages */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </form>
    </div>
  );
}

export default RegistrationPage;
