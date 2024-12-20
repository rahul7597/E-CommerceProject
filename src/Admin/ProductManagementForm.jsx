import axios from 'axios'; // Import Axios
import React, { useState } from 'react';
import './ProductManagementForm.css';

const ProductManagementForm = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    quantity: '',
    image: null,
  });

  const [loading, setLoading] = useState(false); // To handle loading state
  const [error, setError] = useState(null); // To handle error state
  const [success, setSuccess] = useState(null); // To handle success state

  // Handle input changes for all fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle image file change
  const handleImageChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      image: e.target.files[0], // Store the file in the state
    }));
  };

  // Handle form submission and send data to API using Axios
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the form data for submission
    const formData = new FormData();
    formData.append('image', product.image); // Append the image file
    formData.append('productName', product.name);
    formData.append('productTitle', product.title);
    formData.append('productDescription', product.description);
    formData.append('price', product.price);
    formData.append('category', product.category);
    formData.append('quantity', product.quantity);

    try {
        setLoading(true); // Set loading state to true
        setError(null); // Reset error message
        setSuccess(null); // Reset success message

        // Make the API request to add a new product
        const response = await axios.post('https://ecommerce-spring-react-app-4e1b67b4ade1.herokuapp.com/save', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Ensure correct content type
            },
        });

        setLoading(false); // Set loading state to false after the request completes
        setSuccess('Product added successfully!'); // Set success message
        console.log(response.data); // Log the response for debugging
    } catch (err) {
        setLoading(false); // Set loading state to false if the request fails
        setError('Failed to add product. Please try again.'); // Set error message
        console.error('Error while submitting the form:', err.response);
    }
};


  return (
    <div className="form-container">
      <h1>Product Management</h1>
      
      {/* Show success message if the product was added successfully */}
      {success && <div className="alert success">{success}</div>}

      {/* Show error message if something went wrong */}
      {error && <div className="alert error">{error}</div>}

      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">Product Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={product.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Product Description</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Product Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            required
          />
        </div>

        {/* Submit button */}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default ProductManagementForm;
