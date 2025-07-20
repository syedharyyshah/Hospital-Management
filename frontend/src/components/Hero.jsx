import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ title, imageUrl }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

  const floatingVariants = {
    float: {
      y: [-10, 10],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 3,
          ease: 'easeInOut'
        }
      }
    }
  };

  return (
    <motion.div 
      className='min-h-screen flex flex-col lg:flex-row items-center justify-center p-4 md:p-10 gap-10'
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className='w-full lg:w-1/2 p-4 md:p-5 lg:p-5 text-center lg:text-left'
        variants={textVariants}
      >
        <motion.h2 
          className='font-bold text-3xl md:text-4xl mb-3'
          variants={textVariants}
        >
          {title}
        </motion.h2>
        <motion.p 
          className='mt-6 md:mt-8 lg:mt-10 text-xs md:text-lg'
          variants={textVariants}
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciat
          is porro, magnam illum qui dolores quod, optio animi numquam ab accu
          santium quidem fuga, modi assumenda expedita ad consequatur a suscip
          it eos. Corrupti adipisci consectetur itaque optio est illum modi pe
          rspiciatis magnam accusantium autem. Distinctio rerum quos aspernatu
          r molestias, deserunt architecto beatae.
        </motion.p>
      </motion.div>

      <motion.div 
        className='w-full lg:w-1/2 flex justify-center items-center mt-8 lg:mt-0'
        variants={imageVariants}
      >
        <motion.img 
          src={imageUrl} 
          alt="hero" 
          className='w-80 md:w-[30rem] absolute z-40'
          variants={floatingVariants}
          animate="float"
        />
        <motion.img 
          src="/Vector.png" 
          alt=""  
          className='w-72 relative md:w-[25rem]'
          variants={imageVariants}
        />
      </motion.div>
    </motion.div>
  );
};

export default Hero;