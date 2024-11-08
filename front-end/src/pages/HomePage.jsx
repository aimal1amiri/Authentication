import React from 'react'
import {motion} from 'framer-motion';
import { useAuthenticationStore } from '../store/authentication-Store';
import { formatDate } from '../utils/date';


const HomePage = () => {
  const {user} = useAuthenticationStore();
  return (
    <motion.div
    initial={{opacity:0,scale:0.9}}
    animate={{opacity:1, scale:1}}
    exit={{opacity:0, scale:0.9}}
    transition={{duration:0.5}}
    className='max-w-md w-full mx-auto mt-10 p-8 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800'
    >
      <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-orange-950 to-amber-500 text-transparent bg-clip-text'>
        User Information
      </h2>

      <div className='space-y-6'>
        <motion.div 
        className='p-4 bg-white bg-opacity-50 rounded-lg border border-gray-700'
        initial={{opacity:0, y:20}}
        animate={{opacity:1, y:0}}
        transition={{delay:0.2}}
        >
          <h3 className='text-xl font-semibold text-gray-800 mb-3'>Profile Information</h3>
          <p className='text-gray-700'>Name: {user.name}</p>
          <p className='text-gray-700'>Email: {user.email }</p>
        </motion.div>
      </div>

      <motion.div className='p-4 bg-white bg-opacity-50 rounded-lg border border-gray-700 mb-10'
      initial={{opacity:0, y:20}}
      animate={{opacity:1, y:0}}
      transition={{delay:0.4}}
      >
        <h3 className='text-xl font-semibold text-gray-800 mb-3'>Account Activity</h3>
        <p className='text-gray-700'>
          <span className='font-bold'>Joined: </span>
          {new Date(user.createdAt).toLocaleDateString("en-US",{year:"numeric", month:"long", day:"numeric",})}
        </p>
        <p className='text-gray-700'>
          <span className='font-bold'>Last Login: </span>
          {user.lastLogin ? formatDate(user.lastLogin): "You just singned up!"}
        </p>

      </motion.div>



    </motion.div>
  )
}

export default HomePage