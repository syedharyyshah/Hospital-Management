import React, { useContext, useState } from 'react';
import { Context } from '../main';
import { TiHome } from 'react-icons/ti';
import { RiLogoutBoxFill } from 'react-icons/ri';
import { AiFillMessage } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaUserDoctor } from 'react-icons/fa6';
import { MdAddModerator } from 'react-icons/md';
import { IoPersonAddSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion'; // Import Framer Motion

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const gotoHome = () => {
    navigateTo('/');
    setShow(!show);
  };
  const gotoDoctorsPage = () => {
    navigateTo('/doctors');
    setShow(!show);
  };
  const gotoMessagePage = () => {
    navigateTo('/messages');
    setShow(!show);
  };
  const gotoAddNewDoctor = () => {
    navigateTo('/doctor/addnew');
    setShow(!show);
  };
  const gotoAddNewAdmin = () => {
    navigateTo('/admin/addnew');
    setShow(!show);
  };

  const handleLogout = async () => {
    await axios
      .get('https://hospital-management-gkeb.vercel.app/api/v1/user/admin/logout', {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  // Framer Motion variants for sidebar
  const sidebarVariants = {
    open: { x: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
    closed: { x: '-100%', transition: { duration: 0.3, ease: 'easeInOut' } },
  };

  // Framer Motion variants for icons
  const iconVariants = {
    initial: { scale: 1, opacity: 0.8 },
    hover: { scale: 1.2, opacity: 1, transition: { duration: 0.2 } },
    tap: { scale: 0.9, transition: { duration: 0.1 } },
  };

  // Framer Motion variants for hamburger menu
  const hamburgerVariants = {
    initial: { rotate: 0, opacity: 0.8 },
    hover: { scale: 1.1, opacity: 1, transition: { duration: 0.2 } },
    tap: { scale: 0.9, transition: { duration: 0.1 } },
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-16 md:w-20 ${
          !isAuthenticated ? 'hidden' : 'flex'
        } flex-col items-center py-6 z-50 sidebar`}
        variants={sidebarVariants}
        initial="closed"
        animate={show || window.innerWidth >= 768 ? 'open' : 'closed'} 
      >
        <motion.div
          className="flex flex-col items-center h-full justify-center space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.4 } }}
        >
          <motion.div variants={iconVariants} initial="initial" whileHover="hover" whileTap="tap">
            <TiHome
              className="text-2xl hover:text-blue-400 cursor-pointer transition-colors"
              onClick={gotoHome}
              title="Home"
            />
          </motion.div>
          <motion.div variants={iconVariants} initial="initial" whileHover="hover" whileTap="tap">
            <FaUserDoctor
              className="text-2xl hover:text-blue-400 cursor-pointer transition-colors"
              onClick={gotoDoctorsPage}
              title="Doctors"
            />
          </motion.div>
          <motion.div variants={iconVariants} initial="initial" whileHover="hover" whileTap="tap">
            <MdAddModerator
              className="text-2xl hover:text-blue-400 cursor-pointer transition-colors"
              onClick={gotoAddNewAdmin}
              title="Add Admin"
            />
          </motion.div>
          <motion.div variants={iconVariants} initial="initial" whileHover="hover" whileTap="tap">
            <IoPersonAddSharp
              className="text-2xl hover:text-blue-400 cursor-pointer transition-colors"
              onClick={gotoAddNewDoctor}
              title="Add Doctor"
            />
          </motion.div>
          <motion.div variants={iconVariants} initial="initial" whileHover="hover" whileTap="tap">
            <AiFillMessage
              className="text-2xl hover:text-blue-400 cursor-pointer transition-colors"
              onClick={gotoMessagePage}
              title="Messages"
            />
          </motion.div>
          <motion.div variants={iconVariants} initial="initial" whileHover="hover" whileTap="tap">
            <RiLogoutBoxFill
              className="text-2xl hover:text-red-400 cursor-pointer transition-colors"
              onClick={handleLogout}
              title="Logout"
            />
          </motion.div>
        </motion.div>
      </motion.nav>
      <div
        className={`${!isAuthenticated ? 'hidden' : 'flex'} md:hidden fixed top-4 left-4 z-50`}
      >
        <motion.div
          variants={hamburgerVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
        >
          <GiHamburgerMenu
            className={`text-2xl cursor-pointer transition-colors ${
              show ? 'text-gray-50' : 'text-gray-800 hover:text-blue-600'
            }`}
            onClick={() => setShow(!show)}
          />
        </motion.div>
      </div>
    </>
  );
};

export default Sidebar;