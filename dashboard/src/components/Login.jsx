import React, { useContext, useState } from 'react';
import { Context } from '../main';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Basic validation
    if (password !== confirmPassword) {
      toast.error('Passwords do not match', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        'http://localhost:4000/api/v1/user/login',
        { email, password, confirmPassword, role: 'Admin' },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );
      
      toast.success(`Welcome back, ${data.user.firstName}!`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      setIsAuthenticated(true);
      navigateTo('/');
    } catch (error) {
      let errorMessage = error.response?.data?.message || 'Login failed';
      
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const inputFocusVariants = {
    focus: {
      scale: 1.02,
      boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)"
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 py-10 px-4"
    >
      {/* Testing accounts info */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8 bg-blue-50 p-4 rounded-lg border border-blue-200 max-w-md w-full text-center"
      >
        <h2 className="text-lg font-medium text-blue-800 mb-2">
          For testing purposes:
        </h2>
        <p className="text-sm text-gray-700">
          Email: ayan@gmail.com<br />
          Password: 12345678<br />
          <span className="block mt-1">or</span>
          Email: hareem@gmail.com<br />
          Password: 12345678
        </p>
      </motion.div>

      {/* Login form */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-100"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <img 
            src="/logo.png" 
            alt="Shah Care Logo" 
            className="h-16 w-auto"
          />
        </motion.div>

        <motion.form 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleLogin} 
          className="space-y-6"
        >
          <motion.div variants={itemVariants}>
            <motion.h1 className="text-2xl font-bold text-gray-800 text-center">
              Welcome to SHAH CARE
            </motion.h1>
            <motion.p className="text-sm text-gray-500 text-center mt-1">
              Only Admins are allowed to access these resources!
            </motion.p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <motion.input
              whileFocus="focus"
              variants={inputFocusVariants}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            />
            <motion.input
              whileFocus="focus"
              variants={inputFocusVariants}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            />
            <motion.input
              whileFocus="focus"
              variants={inputFocusVariants}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            />
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <motion.button
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700 cursor-pointer'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : 'Login'}
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default Login;