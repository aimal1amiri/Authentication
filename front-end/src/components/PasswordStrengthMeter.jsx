import { Check, X } from 'lucide-react';
import React from 'react'

const PasswordRule = ({password}) => {
    const rule=[
        {label: "At least 6 characters", met: password.length >= 6},
        {label:"Contains uppercase letter",met: /[A-Z]/.test(password) },
        {label:"Contains lowercase letter", met:/[a-z]/.test(password)},
        {label:"Contains a number", met:/\d/.test(password)},
        {label:"Contains special letter", met:/[^A-Za-z0-9]/.test(password)},
    ];

    return (
        <div className='mt-2 space-y-1'>
        {rule.map((item) =>(
            <div key={item.label} className='flex items-center test-xs'>
                {item.met ? (<Check className='size-4 text-orange-500 mr-2' />) : ( <X className='size-4 text-gray-600 mr-2'/>)}
                <span className={item.met ? 'text-orange-500' : 'text-gray-600'}>
                    {item.label}
                </span>
            </div>
        ))}
        </div>
    );
};

const PasswordStrengthMeter = ({password}) => {
    const getStrength = (pass) => {
        let stregnth =0 ;
        if(pass.length >= 6) stregnth++;
        if(pass.match(/[a-z]/) && pass.match(/[A-Z]/)) stregnth++;
        if(pass.match(/\d/)) stregnth++;
        if(pass.match(/[^a-zA-Z\d]/)) stregnth++;

        return stregnth;
    };
    const stregnth = getStrength(password);

    const getColor = (stregnth) => {
        if(stregnth === 0) return "bg-red-500";
        if(stregnth === 1) return "bg-red-400";
        if(stregnth === 2) return "bg-yellow-500";
        if(stregnth === 3) return "bg-yellow-300";
        return "bg-amber-500"
    };

    const getStrengthText = (stregnth) =>{
        if(stregnth === 0) return "Very Weak";
        if(stregnth === 1) return "Weak";
        if(stregnth === 2) return "Fair";
        if(stregnth === 3) return "Good";
        return "Strong";
    };

  return (
    <div className='mt-2 '>
        <div className='flex justify-between items-center mb-1'>
            <span className='text-xs text-gray-400'> Password strength</span>
            <span className='text-xs text-gray-400'> {getStrengthText(stregnth)}</span>
            
        </div>
        <div className='flex space-x-1'>
            {[...Array(4)].map((_, index) => (
                <div key={index} className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${index < stregnth ? getColor(stregnth) : "bg-gray-300"}`} />
            ))}
        </div>
        <PasswordRule password={password} /> 
    </div>
  )
};

export default PasswordStrengthMeter