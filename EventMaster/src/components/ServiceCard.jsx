import React from 'react';
import { motion } from 'framer-motion';

const ServiceCard = ({ title, description, icon }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white rounded-lg shadow-md p-4 cursor-pointer transition-all duration-300 hover:shadow-lg w-full max-w-xs mx-auto"
    >
      <div className="text-center">
        <div className="text-3xl mb-3 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          {icon}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 leading-snug">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
