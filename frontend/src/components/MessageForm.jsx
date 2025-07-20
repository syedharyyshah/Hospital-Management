import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const MessageForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  
  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://hospital-management-gkeb.vercel.app/api/v1/message/send",
        { firstName, lastName, phone, email, message },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

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

  const buttonHover = {
    hover: { scale: 1.03 },
    tap: { scale: 0.98 }
  };

  return (
    <motion.div 
      className="container mx-auto px-4 py-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={container}
    >
      <motion.h2 
        className="text-3xl font-bold text-center mb-8"
        variants={item}
      >
        Send Us A Message
      </motion.h2>
      
      <motion.form 
        onSubmit={handleMessage} 
        className="mx-auto"
        variants={container}
      >
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
          variants={container}
        >
          <motion.input 
            type="text"
            placeholder='First Name' 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            className="w-full p-3 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            variants={item}
          />
          <motion.input 
            type="text"
            placeholder='Last Name' 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            className="w-full p-3 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            variants={item}
          />
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
          variants={container}
        >
          <motion.input 
            type="email"
            placeholder='Email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full p-3 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            variants={item}
          />
          <motion.input 
            type="tel"
            placeholder='Phone Number' 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            className="w-full p-3 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            variants={item}
          />
        </motion.div>
        
        <motion.textarea 
          rows={7}
          placeholder='Message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 border bg-white border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          variants={item}
        />
        
        <motion.div 
          className="text-center"
          variants={item}
        >
          <motion.button 
            type='submit'
            className="bg-blue-500 cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            variants={buttonHover}
            whileHover="hover"
            whileTap="tap"
          >
            Send
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default MessageForm;