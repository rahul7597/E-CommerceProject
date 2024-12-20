import React, { useState } from 'react';
import './AddressForm.css';

const AddressForm = () => {
  const [addresses, setAddresses] = useState([
    { id: Date.now(), name: '', street: '', city: '', state: '', zip: '', country: '', phone: '' },
  ]);
  const [loading, setLoading] = useState(false);  // Loading state for API call
  const [error, setError] = useState('');  // Error state to display error messages
  const [successMessage, setSuccessMessage] = useState(''); // Success message to show after successful form submission

  // Handle change in address fields
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newAddresses = [...addresses];
    newAddresses[index][name] = value;
    setAddresses(newAddresses);
  };

  // Handle adding a new address
  const handleAddAddress = () => {
    setAddresses([
      ...addresses,
      { id: Date.now(), name: '', street: '', city: '', state: '', zip: '', country: '', phone: '' },
    ]);
  };

  // Handle removing an address
  const handleRemoveAddress = (index) => {
    if (addresses.length > 1) {
      const newAddresses = addresses.filter((_, i) => i !== index);
      setAddresses(newAddresses);
    }
  };

  // Validate if any address has missing information
  const isFormValid = () => {
    for (let i = 0; i < addresses.length; i++) {
      const address = addresses[i];
      if (
        !address.name || 
        !address.street || 
        !address.city || 
        !address.state || 
        !address.zip || 
        !address.country || 
        !address.phone
      ) {
        return false; // If any required field is empty, return false
      }
    }
    return true; // All fields are filled
  };

  // Handle form submission (API call)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      setError('All fields are required for each address.');
      return; // If form is invalid, do not submit
    }

    setLoading(true);
    setError(''); // Reset error before making API call
    setSuccessMessage(''); // Reset success message

    try {
      // Log the addresses data to check if all fields are filled correctly
      console.log('Submitting Addresses:', addresses);

      // Using Fetch API to save the addresses (change URL to your actual API endpoint)
      const response = await fetch('http://localhost:1112/addressreturn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ addresses: addresses }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle success (example: clear form or show success message)
        setSuccessMessage('Addresses saved successfully!');
        setAddresses([{ id: Date.now(), name: '', street: '', city: '', state: '', zip: '', country: '', phone: '' }]); // Reset the form
      } else {
        // If the response is not ok, set error message
        setError('Failed to save addresses. Please try again.');
      }
    } catch (err) {
      // Handle error (e.g., show error message)
      setError('An error occurred while saving addresses. Please try again.');
      console.error('Error saving addresses:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="address-form-container">
      <h1>Add Shipping Address</h1>
      
      {/* Display Success message */}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {/* Display error message */}
      {error && <div className="error-message">{error}</div>} 

      <form onSubmit={handleSubmit} className="address-form">
        {addresses.map((address, index) => (
          <div key={address.id} className="address-card">
            <h2>Address {index + 1}</h2>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={address.name}
                onChange={(e) => handleChange(index, e)}
                placeholder="Full Name"
                required
              />
            </div>
            <div className="form-group">
              <label>Street Address</label>
              <input
                type="text"
                name="street"
                value={address.street}
                onChange={(e) => handleChange(index, e)}
                placeholder="Street, Apt"
                required
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={(e) => handleChange(index, e)}
                placeholder="City"
                required
              />
            </div>
            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={(e) => handleChange(index, e)}
                placeholder="State"
                required
              />
            </div>
            <div className="form-group">
              <label>Zip Code</label>
              <input
                type="text"
                name="zip"
                value={address.zip}
                onChange={(e) => handleChange(index, e)}
                placeholder="Zip Code"
                required
              />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={address.country}
                onChange={(e) => handleChange(index, e)}
                placeholder="Country"
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                value={address.phone}
                onChange={(e) => handleChange(index, e)}
                placeholder="Phone Number"
                required
              />
            </div>
            <button
              type="button"
              onClick={() => handleRemoveAddress(index)}
              className="remove-address-btn"
            >
              Remove Address
            </button>
            <hr />
          </div>
        ))}
        <button type="button" onClick={handleAddAddress} className="add-address-btn">
          Add Another Address
        </button>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Saving...' : 'Save Addresses'}
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
