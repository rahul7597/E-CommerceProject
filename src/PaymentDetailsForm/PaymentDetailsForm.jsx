import React, { useState } from 'react';
import './PaymentDetailsForm.css';

const PaymentDetailsForm = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    billingAddress: '',
  });
  const [error, setError] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    billingAddress: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateCardNumber = (cardNumber) => {
    const cardRegex = /^[0-9]{16}$/;
    return cardRegex.test(cardNumber);
  };

  const validateExpiryDate = (expiryDate) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // 0-based
    const [month, year] = expiryDate.split('/').map((item) => parseInt(item.trim()));

    if (
      !expiryDate ||
      isNaN(month) ||
      isNaN(year) ||
      month < 1 ||
      month > 12 ||
      year < currentYear ||
      (year === currentYear && month < currentMonth)
    ) {
      return false;
    }
    return true;
  };

  const validateCVV = (cvv) => {
    return /^[0-9]{3,4}$/.test(cvv);
  };

  const validateForm = () => {
    let isValid = true;
    let newError = { ...error };

    if (!formData.cardNumber || !validateCardNumber(formData.cardNumber)) {
      newError.cardNumber = 'Please enter a valid 16-digit card number';
      isValid = false;
    } else {
      newError.cardNumber = '';
    }

    if (!formData.expiryDate || !validateExpiryDate(formData.expiryDate)) {
      newError.expiryDate = 'Please enter a valid expiry date (MM/YY)';
      isValid = false;
    } else {
      newError.expiryDate = '';
    }

    if (!formData.cvv || !validateCVV(formData.cvv)) {
      newError.cvv = 'Please enter a valid 3 or 4 digit CVV';
      isValid = false;
    } else {
      newError.cvv = '';
    }

    if (!formData.nameOnCard) {
      newError.nameOnCard = 'Name on card is required';
      isValid = false;
    } else {
      newError.nameOnCard = '';
    }

    if (!formData.billingAddress) {
      newError.billingAddress = 'Billing address is required';
      isValid = false;
    } else {
      newError.billingAddress = '';
    }

    setError(newError);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Payment details are valid and ready for submission!');
      // Further processing can be done here, e.g., sending data to the server
    }
  };

  return (
    <div className="payment-details-form-container">
      <h1>Payment Details</h1>
      <form onSubmit={handleSubmit} className="payment-details-form">
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            maxLength="16"
            placeholder="Enter your card number"
            required
          />
          {error.cardNumber && <p className="error-message">{error.cardNumber}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            placeholder="MM/YY"
            maxLength="5"
            required
          />
          {error.expiryDate && <p className="error-message">{error.expiryDate}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="cvv">CVV</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            maxLength="4"
            placeholder="Enter CVV"
            required
          />
          {error.cvv && <p className="error-message">{error.cvv}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="nameOnCard">Name on Card</label>
          <input
            type="text"
            id="nameOnCard"
            name="nameOnCard"
            value={formData.nameOnCard}
            onChange={handleChange}
            placeholder="Enter name on card"
            required
          />
          {error.nameOnCard && <p className="error-message">{error.nameOnCard}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="billingAddress">Billing Address</label>
          <textarea
            id="billingAddress"
            name="billingAddress"
            value={formData.billingAddress}
            onChange={handleChange}
            placeholder="Enter your billing address"
            required
          />
          {error.billingAddress && <p className="error-message">{error.billingAddress}</p>}
        </div>

        <button type="submit" className="submit-btn">Submit Payment</button>
      </form>
    </div>
  );
};

export default PaymentDetailsForm;
