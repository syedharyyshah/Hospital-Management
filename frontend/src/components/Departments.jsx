import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { motion } from 'framer-motion';

const Departments = () => {
  const departmentsArray = [
    {
      name: "Pediatrics",
      imageUrl: "/departments/pedia.jpg",
    },
    {
      name: "Orthopedics",
      imageUrl: "/departments/ortho.jpg",
    },
    {
      name: "Cardiology",
      imageUrl: "/departments/cardio.jpg",
    },
    {
      name: "Neurology",
      imageUrl: "/departments/neuro.jpg",
    },
    {
      name: "Oncology",
      imageUrl: "/departments/onco.jpg",
    },
    {
      name: "Radiology",
      imageUrl: "/departments/radio.jpg",
    },
    {
      name: "Physical Therapy",
      imageUrl: "/departments/therapy.jpg",
    },
    {
      name: "Dermatology",
      imageUrl: "/departments/derma.jpg",
    },
    {
      name: "ENT",
      imageUrl: "/departments/ent.jpg",
    },
  ];

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1,
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1,
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1,
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
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

  const cardHover = {
    hover: {
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="container mx-auto px-4 py-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={container}
    >
      <motion.h2 
        className="text-3xl font-bold text-center mb-8"
        variants={item}
      >
        Departments
      </motion.h2>
      
      <Carousel 
        responsive={responsive}
        className="pb-8"
      >
        {departmentsArray.map((depart, index) => {
          return (
            <motion.div
              className="mx-2 bg-white rounded-lg shadow-md overflow-hidden"
              key={index}
              variants={item}
              whileHover="hover"
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className="p-4 text-center"
                variants={cardHover}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {depart.name}
                </h3>
              </motion.div>
              <motion.img 
                src={depart.imageUrl} 
                alt={depart.name} 
                className="w-full h-48 object-cover"
                variants={cardHover}
              />
            </motion.div>
          )
        })}
      </Carousel>
    </motion.div>
  );
};

export default Departments;