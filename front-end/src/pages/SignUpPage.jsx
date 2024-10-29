import { useState } from 'react'
import { motion} from "framer-motion";
import {User, Mail, Lock} from "lucide-react";
import Input from "../components/Input";
import { Link } from 'react-router-dom';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';

const SignUpPage = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e) =>{
    e.preventDefault();
  }

  return (
    <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.5}} className='max-w-md w-full bg-white backdrop-filter rounded-2xl shadow-xl overflow-hidden'>
      
      <div className='p-8'>
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-l from-orange-950 to-amber-500 text-transparent bg-clip-text'>
          Create Account
        </h2>

        <form onSubmit={handleSignUp}>
          <Input icon={User} type='text' placeholder='Full Name' value={name} onChange={(e) => setName(e.target.value)} />
          <Input icon={Mail} type='email' placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input icon={Lock} type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />

          <PasswordStrengthMeter password={password} />

          <motion.button className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-orange-400 to-amber-500 text-white font-bold rounded-lg shadow-lg
          hover:from-orange-500 hover:to-amber-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2  transition duration-200' 
          whileHover={{scale:1.02}} whileTap={{scale:0.98}} type='submit'> Sign Up

          </motion.button>

        </form>
      </div>
      <div className='px-8 py-4 bg-orange-500 bg-opacity-100 flex justify-center'>
        <p className='text-sm text-white'>
          Already have an account? {""}
          <Link to={"/login"} className='text-amber-800 hover:underline'>  Login </Link>
        </p>
      </div>

    </motion.div>
  );
};

export default SignUpPage;