import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const hours = [
    { id: 1, day: 'Monday', time: '9:00 AM - 11:00 PM' },
    { id: 2, day: 'Tuesday', time: '12:00 PM - 12:00 AM' },
    { id: 3, day: 'Wednesday', time: '10:00 AM - 10:00 PM' },
    { id: 4, day: 'Thursday', time: '9:00 AM - 9:00 PM' },
    { id: 5, day: 'Friday', time: '3:00 PM - 9:00 PM' },
    { id: 6, day: 'Saturday', time: '9:00 AM - 3:00 PM' },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const socialIcon = {
    hover: { 
      y: -3,
      scale: 1.1,
      transition: { type: "spring", stiffness: 300 }
    }
  };

  return (
    <motion.footer 
      className="py-12 px-6 text-gray-800"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={container}
    >
      <motion.hr 
        className="border-t border-gray-800 mb-8"
        variants={item}
      />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo Section */}
        <motion.div 
          className="flex flex-col items-center lg:items-start"
          variants={item}
        >
          <motion.img 
            src="/logo.png" 
            alt="SHAH Medical Complex Logo" 
            className="w-36 h-auto mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
          <motion.p 
            className="text-sm text-gray-600 text-center lg:text-left"
            variants={item}
          >
            SHAH CARE Medical Complex | Your Trusted Healthcare Center
          </motion.p>
        </motion.div>

        {/* Quick Links Section */}
        <motion.div 
          className="text-center lg:text-left"
          variants={container}
        >
          <motion.h4 
            className="text-lg font-semibold text-gray-900 mb-4"
            variants={item}
          >
            Quick Links
          </motion.h4>
          <ul className="space-y-2">
            {['/', '/appointment', '/about'].map((path, index) => (
              <motion.li 
                key={path}
                variants={item}
                whileHover={{ x: 5 }}
              >
                <Link 
                  to={path} 
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {path === '/' ? 'Home' : path === '/appointment' ? 'Appointment' : 'About Us'}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Operating Hours Section */}
        <motion.div 
          className="text-center lg:text-left"
          variants={container}
        >
          <motion.h4 
            className="text-lg font-semibold text-gray-900 mb-4"
            variants={item}
          >
            Operating Hours
          </motion.h4>
          <ul className="space-y-2 text-sm text-gray-600">
            {hours.map((hour) => (
              <motion.li 
                key={hour.id} 
                className="flex justify-center lg:justify-start"
                variants={item}
                whileHover={{ x: 5 }}
              >
                <span className="w-24 font-medium">{hour.day}:</span>
                <span>{hour.time}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Info & Social Media Section */}
        <motion.div 
          className="text-center lg:text-left"
          variants={container}
        >
          <motion.h4 
            className="text-lg font-semibold text-gray-900 mb-4"
            variants={item}
          >
            Contact Us
          </motion.h4>
          <motion.p 
            className="text-sm text-gray-600 mb-2"
            variants={item}
          >
            Email: info@shahmedical.com
          </motion.p>
          <motion.p 
            className="text-sm text-gray-600 mb-2"
            variants={item}
          >
            Phone: +92 (91) 123-4567
          </motion.p>
          <motion.p 
            className="text-sm text-gray-600 mb-4"
            variants={item}
          >
            Address: New Dubgari Gardens, Peshawar, Pakistan
          </motion.p>
          <motion.h4 
            className="text-lg font-semibold text-gray-900 mb-4"
            variants={item}
          >
            Follow Us
          </motion.h4>
          <motion.div 
            className="flex justify-center lg:justify-start gap-4"
            variants={container}
          >
            {[
              { icon: <FaFacebook size={24} />, url: "https://facebook.com" },
              { icon: <FaInstagram size={24} />, url: "https://instagram.com" },
              { icon: <FaLinkedin size={24} />, url: "https://linkedin.com" }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.url.split('.')[1]}
                className="text-gray-800 hover:text-blue-600 transition-colors"
                variants={socialIcon}
                whileHover="hover"
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Copyright Section */}
      <motion.div 
        className="mt-12 text-center text-sm text-gray-600"
        variants={item}
      >
        <p>© {new Date().getFullYear()} SHAH Medical Complex. All rights reserved.</p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;