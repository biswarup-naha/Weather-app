import React from 'react';
import { motion } from 'framer-motion';
import { WiDaySunny, WiCloudy, WiRain } from 'react-icons/wi';

const Loading = () => {
  return (
    <div className='bg-[url(./assets/background.png)] bg-cover bg-center bg-fixed h-screen w-full flex flex-col items-center justify-center'>
      <motion.div
        className="flex flex-col items-center gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <motion.div
            className="absolute -top-8 -left-8"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <WiDaySunny className="w-16 h-16 text-yellow-400" />
          </motion.div>
          <motion.div
            className="absolute -top-4 -right-4"
            animate={{
              y: [0, 10, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <WiCloudy className="w-12 h-12 text-gray-400" />
          </motion.div>
          <motion.div
            className="absolute -bottom-4 -left-4"
            animate={{
              y: [0, 15, 0],
              x: [0, -10, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <WiRain className="w-14 h-14 text-blue-400" />
          </motion.div>
        </div>
        
        <motion.div
          className="text-4xl font-bold text-white text-center"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Loading Weather Data...
        </motion.div>
        
        <motion.div
          className="w-48 h-2 bg-white/20 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Loading; 