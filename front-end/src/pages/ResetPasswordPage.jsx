import React, { useState } from 'react'
import {motion} from "framer-motion";
import { useAuthenticationStore } from '../store/authentication-Store';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const ResetPasswordPage = () => {
    const [password, setPassword]=useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const {resetPassword, error, isLoading, message}=useAuthenticationStore();

    //this one is taking the token from url
    const {token}=useParams();
    const navigate = useNavigate();

  return (
    <motion.div
    initial={{opacity:0,y:20}}
    animate={{opacity:1, y:0}}
    transition={{duration:0.5}}
    className='max-w-md w-full bg-white bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
    >
        <div className='p-8'>
            <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-orange-400 to-amber-500 text-transparent bg-clip-text'>
                Reset Password
            </h2>
            {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
            {message && <p className='text-green-500 text-sm mb-4'>{message}</p>}
        </div>

    </motion.div>
  )
}

export default ResetPasswordPage