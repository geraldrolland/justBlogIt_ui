import React from 'react'
import { motion } from 'framer-motion';
const Loader = () => {
  return (
    <div className='w-[100%] h-[100%] border-1px rounded-md flex justify-center items-center'>
        <motion.div
        className='w-[50px] h-[50px] border-6px rounded-full dark:border-gray-500 dark:border-r-gray-200 border-r-gray-300'
        animate={{
            rotate: ["0deg", "360deg"]
        }    
        }
        transition={{
            duration: 0.3,
            repeat: 1800000,
        }}
        >

        </motion.div>
    </div>
  )
}

export default Loader