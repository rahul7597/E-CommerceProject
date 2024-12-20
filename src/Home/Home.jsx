import React, { useState } from 'react';
import AdvertisementSlider from '../AdvertisementSlider/AdvertisementSlider';
import SortingPage from '../Product/SortingPage';
import './Home.css'
// import ProductManagementForm from '../Admin/ProductManagementForm';
// import ProductManagementForm from '../Product/ProductManagementForm'; // Import the form

function Home() {
  // const [products, setProducts] = useState([]); // State to hold products list

  // Function to add a product to the products state
  // const addProduct = (newProduct) => {
  //   setProducts((prevProducts) => [...prevProducts, newProduct]);
  // };

  return (
    <>
    <div className='home'>
      <AdvertisementSlider />
      {/* Pass addProduct function to the form */}
      {/* <ProductManagementForm addProduct={addProduct} /> */}
      {/* Pass products state to the SortingPage */}
      <SortingPage  />
    </div>
    </>
  );
}

export default Home;
