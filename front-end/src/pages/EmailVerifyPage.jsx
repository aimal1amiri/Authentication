import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {motion} from "framer-motion";


const EmailVerifyPage = () => {

  //the differences between -useState- and -useRef- is ,  you need to re-render the componenet when the state changes, we use -useState- . and when you dont need to re-render the component when the state changes , we use -useRef-
  const [codeDigit,setCodeDigit]= useState(["","","","","",""]);
  
  const inputRef=useRef([]);
  const navigate = useNavigate();

  const handleChange =(index,value) => {
    const newCode =[...codeDigit]

    //when someone copy the 6-digit code when it try to paste so it can be pasted in box
    if(value.length > 1) {
      const pastedCode = value.slice(0,6).split("");
      for(let i =0; i <6 ; i++){
        newCode[i] = pastedCode[i] || "";
      }
      setCodeDigit(newCode);


      //focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5 ;
      inputRef.current[focusIndex].focus();

    }else{
      newCode[index]= value;
      setCodeDigit(newCode);

      //move focus to the next input field if value is entered
      if(value && index < 5){
        inputRef.current[index + 1].focus();
      }

    }
  };

  const handleKeyDown = (index, e) => {
    if(e.key === "Backspace" && !codeDigit[index] && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const isLoading = false;

  const handleSubmit = (e) => {
    e.preventDefault();
    const verificationCode =codeDigit.join("");

    //purpose of alert is for knowing that function is working
    alert(`verification code is submited ${verificationCode}`);
      }

  useEffect(() => {
    if (codeDigit.every(digit => digit !='')){
      handleSubmit(new Event('submit'))
    }
  }, [codeDigit])



  return (
    <div className='max-w-md w-full bg-white bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
      <motion.div initial={{opacity:0 , y:50}} animate={{opacity:1, y:0}} transition={{duration:0.5}} className='bg-white bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md'>
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-orange-500 to-amber-900 text-transparent bg-clip-text'>
          Verify Your Email
        </h2>

        <p className='text-center text-black mb-6'>
          Enter the 6-digit code sent to your email address.
        </p>

        <form onSubmit={handleSubmit} className='space-y-6 '>
          <div className='flex justify-between'>
            {codeDigit.map((digit, index) => (
              <input 
              key={index}
              ref={(el) => (inputRef.current[index]=el)}
              type='text'
              maxLength='6'
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className='w-12 h-12 text-center text-2xl font-bold bg-white text-black border-2 border-amber-400 rounded-lg focus:border-orange-500 focus:outline-none'
              />
              
            ))}

          </div>

          <motion.button 
          whileHover={{scale:1.05}} 
          whileTap={{scale:0.95}} 
          type='submit' 
          disabled={isLoading || codeDigit.some((digit) => !digit)}
          className='w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-orange-500 hover:to-amber-500 focus:outline-none focus:ring-2 focus:ring-orange-800 focus:ring-opacity-50 disabled:opacity-70 '
          >
            {isLoading ? "Verifying..." : "Verify Email"}

          </motion.button>

        </form>

      </motion.div>
    </div>
  )
}

export default EmailVerifyPage