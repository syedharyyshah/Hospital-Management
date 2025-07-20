import React, { useContext, useEffect } from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Appointment from './pages/Appointment';
import AboutUs from './pages/AboutUs';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { Context } from './main';
import axios from 'axios';
import Footer from './components/Footer';
import ProtectedRoute from './pages/protectedRoute'; // Import the ProtectedRoute

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/patient/me",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated, setIsAuthenticated, setUser]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/appointment"
            element={
              <ProtectedRoute element={Appointment} />
            }
          />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;