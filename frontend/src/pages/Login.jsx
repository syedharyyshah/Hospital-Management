import React, { useContext, useState } from 'react';
import { Context } from '../main';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        {email,password,confirmPassword,role:"Patient"},
        {
          withCredentials:true,
          headers:{"Content-Type":"application/json"},
        }
      );
      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated){
    return <Navigate to="/" />
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="bg-gray-50 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-center mb-4"
        >
          Sign In
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-gray-600 mb-2"
        >
          Please Login to continue
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-500 mb-6"
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis pariatur
          optio mollitia iste culpa perspiciatis.
        </motion.p>
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onSubmit={handleLogin} 
          className="space-y-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex gap-3 justify-end"
          >
            <p className="text-gray-600">Not Registered?</p>
            <Link
              to="/register"
              className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
            >
              Register Now
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
            >
              Login
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default Login;