import { useState } from 'react'
import { motion} from "framer-motion";
import {User, Mail, Lock, Loader} from "lucide-react";
import Input from "../components/Input";
import { Link, useNavigate } from 'react-router-dom';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import { useAuthenticationStore } from '../store/authentication-Store';

const SignUpPage = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate= useNavigate();
  const {signup, error, isLoading} = useAuthenticationStore();

  const handleSignUp = async (e) =>{
    e.preventDefault();

    try {
      await signup(email, password, name);
      navigate("/verify-email");
    } catch (error) {
      console.log(error)      
    }
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
          {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}

          <PasswordStrengthMeter password={password} />

          <motion.button className='w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-orange-500 hover:to-amber-500 focus:outline-none focus:ring-2 focus:ring-orange-800 focus:ring-opacity-50 disabled:opacity-70 '
          whileHover={{scale:1.05, opacity:90}} whileTap={{scale:0.95}} type='submit' disabled= {isLoading}>
            {isLoading ? <Loader className='animate-spin mx-auto' size={24} /> : "Sign Up"}
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