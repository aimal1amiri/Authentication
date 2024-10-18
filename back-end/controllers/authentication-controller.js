import { Userr } from "../models/user-model.js"
import bcryptjs from 'bcryptjs';
import { generateVerificationCode } from "../utils/generateVerificationCose.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";


export const signup = async(req,res) => {
    const {email, password, name} =req.body;
    
    try {
        if(!email || !name || !password){
            throw new Error("Please fill all the fields")
        }

        const userAlreadyExist = await Userr.findOne({email});
        if(userAlreadyExist){
            return res.status(400).json({success:false,message:"User already exists"});
        }

        const hashedPassword= await bcryptjs.hash(password,10);
        const generateVerificationToken = generateVerificationCode();


        const user = new Userr(
            {email, 
            password:hashedPassword,
            name, 
            verificationToken, 
            verificationTokenExpiresAt:Date.now()+24*60*60*1000
        })

        await user.save();

        generateTokenAndSetCookie(res, user._id);

        res.status(201).json({success:true, message:"Account created successfully" ,user:{...user._doc, password:undefined}});



    } catch (error) {
        res.status(400).json({success:false, message:error.message});
        
    }
}

export const login = async(req,res) => {
    res.send("login route")
}

export const signout = async(req,res) =>{
    res.send("signout route")
}
