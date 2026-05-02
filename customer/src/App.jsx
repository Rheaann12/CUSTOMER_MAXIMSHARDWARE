import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing_page from './assets/Components/Landing_page';
import Login from './assets/Components/Login';
import Signup from './assets/Components/Signup';
import Main_Dashboard from './assets/Components/Main_Dashboard';
import Products1 from './assets/Components/Products1';
import Product_Cement from './assets/Components/Product_Cement';
import Product_Nails from './assets/Components/Product_Nails';
import Product_Paint from './assets/Components/Product_Paint';
import Product_Plumbing from './assets/Components/Product_Plumbing';
import Product_Electrical from './assets/Components/Product_Electrical';
import Product_Tools from './assets/Components/Product_Tools';
import About from './assets/Components/About';
import Contact from './assets/Components/Contact';
import Delivery from './assets/Components/Delivery';
import My_Orders from './assets/Components/My_Orders';
import Add_To_Cart from './assets/Components/Add_To_Cart';
import Edit_Profile from './assets/Components/Edit_Profile';
import User_Profile from './assets/Components/User_Profile';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Landing_page />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/main-dashboard" element={
            <ProtectedRoute>
              <Main_Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <User_Profile />
            </ProtectedRoute>
          } />
          <Route path="/edit-profile" element={
            <ProtectedRoute>
              <Edit_Profile />
            </ProtectedRoute>
          } />
          <Route path="/products" element={<Products1 />} />
          <Route path="/products/cement" element={<Product_Cement />} />
          <Route path="/products/nails" element={<Product_Nails />} />
          <Route path="/products/paint" element={<Product_Paint />} />
          <Route path="/products/plumbing" element={<Product_Plumbing />} />
          <Route path="/products/electrical" element={<Product_Electrical />} />
          <Route path="/products/tools" element={<Product_Tools />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          } />
          <Route path="/delivery" element={
            <ProtectedRoute>
              <Delivery />
            </ProtectedRoute>
          } />
          <Route path="/my-orders" element={
            <ProtectedRoute>
              <My_Orders />
            </ProtectedRoute>
          } />
          <Route path="/add-to-cart" element={
            <ProtectedRoute>
              <Add_To_Cart />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    </Router>
  );
}