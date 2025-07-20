import React, { useContext, useState } from 'react';
import { Context } from '../main';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nic, setNic] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');

  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/patient/register",
        { firstName, lastName, email, phone, nic, dob, gender, password, role:"Patient" },
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

  if (isAuthenticated) {
    return <Navigate to="/" />;
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
        transition={{ duration: 0.5 }}
        className="bg-gray-50 p-8 rounded-lg shadow-lg w-full max-w-lg"
      >
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-center mb-4"
        >
          Sign Up
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-gray-600 mb-2"
        >
          Please Sign Up to continue
        </motion.p>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-500 mb-6"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quis
          reprehenderit laudantium cum id nostrum.
        </motion.p>
        <motion.form 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onSubmit={handleRegister} 
          className="space-y-4"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              placeholder="NIC"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <motion.select
              whileFocus={{ scale: 1.02 }}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </motion.select>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="flex justify-end gap-3"
          >
            <p className="text-gray-600">Already Registered?</p>
            <Link
              to="/login"
              className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
            >
              Login Now
            </Link>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
            >
              Register
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default Register;