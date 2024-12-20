
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css'
// import App from './App.jsx'
import About from './About/About';
import Contact from './Contact/Contact';
import Login from './Login/Login';
import RegistrationPage from './RegistrationPage/RegistrationPage';
import Home from './Home/Home';
import Navbar from './NavBar/Navbar.jsx';
import ProductDetail from './ProductSlider/ProductDetails.jsx';
import ForgotPassword from './Login/ForgetPassword/ForgotPassword.jsx';
import ProductManagementForm from './Admin/ProductManagementForm.jsx';
import AddressForm from './AddressForm/AddressForm.jsx';
import OrderHistory from './OrderHistory/OrderHistory.jsx';
import WishlistForm from './WishlistForm/WishlistForm.jsx';
import PaymentDetailsForm from './PaymentDetailsForm/PaymentDetailsForm.jsx';
import FormsNavigation from './FormsNavigation/FormsNavigation.jsx';
import ReturnRefundForm from './OrderHistory/ReturnRefundForm.jsx';
import CheckoutForm from './CheckoutForm/CheckoutForm.jsx';
import CartPage from './ProductSlider/CartPage/CartPage.jsx';
// import GopalapiPage from './GopalApi/GopalapiPage.jsx';
// import Product from './Product/Product.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Navbar/>
    <FormsNavigation/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* <Route path="/product" element={<ProductDetail/>} /> */}
          <Route path="/product/:productId" element={<ProductDetail/>} />
          <Route path="/address" element={<AddressForm/>} />
          <Route path="/order" element={<OrderHistory/>} />
          <Route path="/wishlist" element={<WishlistForm/>} />
          <Route path="/payment" element={<PaymentDetailsForm/>} />
          {/* <Route path="/productmanagement" element={<ProductManagementForm/>} /> */}
          <Route path="/productmanagement" element={<ProductManagementForm/>} />
          <Route path="/return&refund" element={<ReturnRefundForm/>} />
          <Route path="/checkout" element={<CheckoutForm/>} />
          <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
