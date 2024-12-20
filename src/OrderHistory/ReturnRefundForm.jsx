import React, { useState } from 'react';
import './ReturnRefundForm.css';

const ReturnRefundForm = () => {
  const [formData, setFormData] = useState({
    orderNumber: '',
    productName: '',
    reason: '',
    refundMethod: '',
    additionalNotes: '',
  });

  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.orderNumber || !formData.productName || !formData.reason || !formData.refundMethod) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    alert('Return and refund request submitted successfully!');
    setFormData({
      orderNumber: '',
      productName: '',
      reason: '',
      refundMethod: '',
      additionalNotes: '',
    });
  };

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="return-refund-form-container">
      <h1>Return and Refund Request</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="return-refund-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="orderNumber">Order Number*</label>
          <input
            type="text"
            id="orderNumber"
            name="orderNumber"
            value={formData.orderNumber}
            onChange={handleChange}
            placeholder="Enter your order number"
          />
        </div>
        <div className="form-group">
          <label htmlFor="productName">Product Name*</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            placeholder="Enter the product name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="reason">Reason for Return/Refund*</label>
          <select
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
          >
            <option value="">Select reason</option>
            <option value="damaged">Damaged Product</option>
            <option value="incorrect">Incorrect Product</option>
            <option value="unwanted">Unwanted Item</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="refundMethod">Refund Method*</label>
          <select
            id="refundMethod"
            name="refundMethod"
            value={formData.refundMethod}
            onChange={handleChange}
          >
            <option value="">Select refund method</option>
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bankTransfer">Bank Transfer</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="additionalNotes">Additional Notes</label>
          <textarea
            id="additionalNotes"
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            placeholder="Add any additional details"
          ></textarea>
        </div>
        <button type="submit" className="submit-btn">Submit Request</button>
      </form>
    </div>
  );
};

export default ReturnRefundForm;
