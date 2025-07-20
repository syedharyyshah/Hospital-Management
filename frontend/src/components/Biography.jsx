import React from 'react';
import { motion } from 'framer-motion';

const Biography = ({ imageUrl }) => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const imageAnim = {
    hidden: { opacity: 0, x: -20 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <motion.div 
      className="max-w-6xl mx-auto px-4 py-12 md:py-20"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={container}
    >
      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        <motion.div 
          className="md:w-1/2"
          variants={imageAnim}
        >
          <img 
            className='w-80 md:w-[30rem]'
            src={imageUrl}  
            alt="Biography visual"
          />
        </motion.div>

        <motion.div 
          className="md:w-1/2"
          variants={container}
        >
          <motion.p 
            className="text-sm font-semibold text-gray-800 uppercase tracking-wider"
            variants={item}
          >
            Biography
          </motion.p>
          <motion.h3 
            className="text-3xl font-bold text-gray-800 mt-2 mb-4"
            variants={item}
          >
            Who We Are
          </motion.h3>
          <motion.p 
            className="text-gray-600 leading-relaxed"
            variants={item}
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciat
            is porro, magnam illum qui dolores quod, optio animi numquam ab accu
            santium quidem fuga, modi assumenda expedita ad consequatur a suscip
            it eos.
          </motion.p>
          <motion.p 
            className="text-gray-600 leading-relaxed"
            variants={item}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus, eaque.
          </motion.p>
          <motion.p 
            className="text-gray-600 leading-relaxed"
            variants={item}
          >
            Lorem ipsum dolor sit amet.
          </motion.p>
          <motion.p 
            className="text-gray-600 leading-relaxed"
            variants={item}
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque porro
            , laudantium magni expedita minus, vitae repellendus nam maxime iste, 
            esse quam quo numquam aliquid corporis sequi ea nemo neque explicabo.
            aliquid corporis sequi ea nemo neque explicabo.
          </motion.p>
          <motion.p 
            className="text-gray-600 leading-relaxed"
            variants={item}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
            deleniti eaque? Nam mollitia iusto alias corrupti harum eligendi,
            repellendus autem.
          </motion.p>
          <motion.p 
            className="text-gray-600 leading-relaxed"
            variants={item}
          >
            Lorem ipsum dolor sit.
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Biography;