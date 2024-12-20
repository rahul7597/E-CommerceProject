import React from 'react';
import './About.css'
function About() {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>About Us</h1>
        <p>Welcome to our e-commerce website!</p>
      </div>
      <div className="about-content">
        <div className="about-image">
          <img src="about-image.jpg" alt="About Image" />
        </div>
        <div className="about-description">
          <h2>Our Story</h2>
          <p>
            Our company was founded in 2020 with the goal of providing the best e-commerce experience to our customers. We believe in providing high-quality products at affordable prices, and we strive to provide excellent customer service.
          </p>
          <h2>Our Mission</h2>
          <p>
            Our mission is to become the leading e-commerce platform in the industry, and to provide our customers with an unparalleled shopping experience.
          </p>
          <h2>Our Values</h2>
          <p>
            We value our customers, and we strive to provide them with the best possible service. We also value our employees, and we provide them with a safe and supportive work environment.
          </p>
        </div>
      </div>
      <div className="about-footer">
        <p>&copy; 2023 Our Company. All rights reserved.</p>
      </div>
    </div>
  );
}

export default About;
