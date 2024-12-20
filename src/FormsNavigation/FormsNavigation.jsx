import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FormsNavigation.css';

const FormsNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the hamburger menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="forms-navigation">
      {/* Hamburger Menu Icon */}
      <div className={`hamburger-icon ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* List of Forms */}
      <div className={`form-list ${isMenuOpen ? 'show' : ''}`}>
        <ul>
          {/* <li><Link to="/product/:productId">Product</Link></li> */}
          <li><Link to="/address">Address</Link></li>
          <li><Link to="/order">Order</Link></li>
          <li><Link to="/wishlist">Wishlist</Link></li>
          <li><Link to="/checkout">CheckOut</Link></li>
          <li><Link to="/payment">Payment</Link></li>
          <li><Link to="/productmanagement">Admin</Link></li>  
          <li><Link to="/return&refund">Return&Refund</Link></li>  
          <li><Link to="/sorting">SortingPage</Link></li>  
          <li><Link to="/cart">CartPage</Link></li>  
        </ul>
      </div>
    </div>
  );
};

export default FormsNavigation;
