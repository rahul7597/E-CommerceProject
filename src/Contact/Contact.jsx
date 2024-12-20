import React from 'react';
import './Contact.css'
function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Get in Touch</h1>
        <p>We'd love to hear from you!</p>
      </div>
      <div className="contact-content">
        <div className="contact-info">
          <h2>Contact Information</h2>
          <p>
            Address: 123 Main St, Anytown, USA
            <br />
            Phone: 555-555-5555
            <br />
            Email: <a href="mailto:info@example.com">info@example.com</a>
          </p>
        </div>
        <div className="contact-form">
          <h2>Send Us a Message</h2>
          <form>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <textarea placeholder="Message"></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
      <div className="contact-footer">
        <p>&copy; 2023 Example Company. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Contact;
