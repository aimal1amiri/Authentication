import React, { useState } from 'react'
import {motion} from "framer-motion";
import { Mail, Lock, Loader } from 'lucide-react';
import {Link} from "react-router-dom"
import Input from '../components/Input';

const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoading= false;

  const handleLogin = (e) =>{
    e.preventDefault();

  }


  return (
    <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.5}} className='max-w-md w-full bg-white backdrop-filter rounded-2xl shadow-xl overflow-hidden'>

      <div className='p-8'>
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-t from-orange-950 to-amber-500 text-transparent bg-clip-text'>
          Login
        </h2>

        <form onSubmit={handleLogin}> 
          <Input icon={Mail} type='email' placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input icon={Lock} type='password' placeholder='Password' value={password} onChange= {(e) => setPassword(e.target.value)} />
          
          <div className='flex items-center mb-6'>
            <Link to='/forgot-password' className='text-sm text-black text-right hover:underline'>
            Forgot password ?
            </Link>
          
          </div>

          <motion.button className='mt-1 w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold rounded-lg shadow-lg
          hover:from-orange-500 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2  transition duration-200' 
          whileHover={{scale:1.02}} whileTap={{scale:0.98}} type='submit' disabled={isLoading}> {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto'/> : "Login"}

          </motion.button>

        </form>

      </div>

      <div className='px-8 py-4 bg-orange-500 bg-opacity-100 flex justify-center'>
        <p className='text-sm text-white'>
          Don&apos;t have an account? {""}
          <Link to={"/signup"} className='text-amber-800 hover:underline'>  Signup </Link>
        </p>
      </div>
      
    </motion.div>  
  )
}

export default LoginPage