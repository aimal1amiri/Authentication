import { Userr } from "../models/user-model.js"
import bcryptjs from 'bcryptjs';
import { generateVerificationCode } from "../utils/generateVerificationCode.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mailTrap/email.js";


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
        const verificationToken = generateVerificationToken;


        //console.log(generateVerificationToken)


        const user = new Userr(
            {email, 
            password:hashedPassword,
            name, 
            verificationToken, 
            verificationTokenExpiresAt:Date.now()+24*60*60*1000
        })

        await user.save();

        generateTokenAndSetCookie(res, user._id);
        
        await sendVerificationEmail(user.email, verificationToken);



        res.status(201).json({success:true, message:"Account created successfully" ,user:{...user._doc, password:undefined}});



    } catch (error) {
        res.status(400).json({success:false, message:error.message});
        
    }
}

export const verifyEmail = async(req,res) => {

    const {code} = req.body;

    try {
        const user= await Userr.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: {$gt: Date.now()}
        })

        if(!user){
            return res.status(400).json({success:false, message:"Invalid verification code."});
        }

        user.isVerified=true;
        user.verificationToken=undefined;
        user.verificationTokenExpiresAt=undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);

        
        res.status(200).json({success:true, message:"Email verified successfully", user:{...user._doc, password:undefined,},})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Server Error"});        
    }
};

export const login = async(req,res) => {
    res.send("login route")
}

export const signout = async(req,res) =>{
    res.clearCookie("token");
    res.status(200).json({success:true, message:"Signout successfully."});
}
