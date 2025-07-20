import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../main';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get('https://hospital-management-gkeb.vercel.app/api/v1/user/patient/logout', {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setIsAuthenticated(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Logout failed');
    }
  };

  const gotoLogin = () => {
    hologram();
    navigateTo('/login');
  };

  const hologram = () => {
    setShow(false);
  }

  // Animation variants
  const mobileMenuVariants = {
    hidden: { x: '-100%' },
    visible: { x: 0 },
    exit: { x: '-100%' }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5 },
    exit: { opacity: 0 }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <nav className="relative z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo and Hamburger Icon */}
        <div className="flex items-center">
          {/* Hamburger Icon - Only shown when menu is closed */}
          {!show && (
            <motion.button
              className="md:hidden text-2xl focus:outline-none mr-4"
              onClick={() => setShow(true)}
              aria-label="Open menu"
              whileTap={{ scale: 0.9 }}
            >
              <AiOutlineMenu size={20} />
            </motion.button>
          )}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img src="/logo.png" alt="SHAH Medical Complex Logo" className="w-36 h-auto" />
          </motion.div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          {['/', '/appointment', '/about'].map((path, index) => (
            <motion.div
              key={path}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={path}
                className="hover:text-blue-500 transition-colors duration-200 py-2 px-4"
              >
                {path === '/' ? 'HOME' : path === '/appointment' ? 'APPOINTMENT' : 'ABOUT US'}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Auth Buttons */}
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {isAuthenticated ? (
            <motion.button
              onClick={handleLogout}
              className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              LOGOUT
            </motion.button>
          ) : (
            <motion.button
              onClick={gotoLogin}
              className="bg-green-500 cursor-pointer hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              LOGIN
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Mobile Menu with AnimatePresence */}
      <AnimatePresence>
        {show && (
          <>
            <motion.div
              className="z-50 fixed h-full left-0 top-0 w-[60%] bg-white"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
              transition={{ type: 'tween', ease: 'easeInOut' }}
            >
              <div className="flex flex-col h-full">
                {/* Close Button and Logo */}
                <div className="flex items-center justify-between p-4">
                  <img src="/logo.png" alt="SHAH Medical Complex Logo" className="w-36 h-auto" />
                  <motion.button
                    className="md:hidden text-2xl focus:outline-none"
                    onClick={() => setShow(false)}
                    aria-label="Close menu"
                    whileTap={{ scale: 0.9 }}
                  >
                    <AiOutlineClose size={20} />
                  </motion.button>
                </div>
                {/* Menu Items */}
                <div className="flex flex-col space-y-4 p-4">
                  {['/', '/appointment', '/about'].map((path, index) => (
                    <motion.div
                      key={path}
                      variants={navItemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={path}
                        className="hover:text-blue-500 transition-colors duration-200 py-2 px-4"
                        onClick={() => setShow(false)}
                      >
                        {path === '/' ? 'HOME' : path === '/appointment' ? 'APPOINTMENT' : 'ABOUT US'}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Overlay when menu is open */}
            <motion.div
              className="fixed inset-0 bg-black z-40 md:hidden"
              onClick={() => setShow(false)}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={overlayVariants}
              transition={{ duration: 0.3 }}
            />
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;