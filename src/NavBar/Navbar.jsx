import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu visibility

  // Function to toggle the hamburger icon and the menu
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu visibility
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img
          src="https://th.bing.com/th/id/R.5eb1959636a370b661bc91940fe49cee?rik=DiotHJlkKQR6dg&riu=http%3a%2f%2fwww.datwebdigital.com%2fDWD%2fwp-content%2fuploads%2f2012%2f06%2flogo-design.jpg&ehk=fa8lsC0cm1nXH1dOqP%2f9dC1ohF3%2bcobEoqkMOaxrV2I%3d&risl=&pid=ImgRaw&r=0"
          alt="Logo"
        />
        <span>Company Name</span>
      </div>

      {/* Search Bar */}
      <div className="search-bar sb">
        <input type="search" placeholder="Search..." />
        <button type="submit">Search</button>
      </div>

      {/* Hamburger Icon */}
      <div className={`hamburger ${isMenuOpen ? 'change' : ''}`} onClick={handleMenuToggle}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>

      {/* Navigation Links */}
      <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
