import { Userr } from "../models/user-model.js"
import bcryptjs from 'bcryptjs';
import { generateVerificationCode } from "../utils/generateVerificationCode.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail,sendPasswordResetEmail,sendResetSuccessEmail } from "../mailTrap/email.js";
import crypto from "crypto";


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

    const {email, password}=req.body;
    try {
        const user= await Userr.findOne({email});
        
        if(!user) {
            return res.status(400).json({success:false,message:"Invalid credentials"});
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if(!isPasswordValid) {
            return res.status(400).json({success:false, message:"Invalid credentialss"});
        }

        generateTokenAndSetCookie(res,user._id);

        user.lastLogin= new Date();

        await user.save();

        res.status(200).json({success:true, message:"Logged in successfully", user:{...user._doc, password:undefined,},})
    } catch (error) {
        console.log(error);
        res.status(400).json({success:false,message:error.message});        
    }
};

export const forgotPassword = async(req,res) =>{
    const {email}=req.body;

    try {
        const user = await Userr.findOne({email });
        

        if(user){
        //generating reset token
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt= Date.now() + 4*60*60*1000; //it is 1 hours. the token will be valid for 1 hours.

        user.resetPasswordToken= resetToken;
        user.resetPasswordExpiresAt=resetTokenExpiresAt;

        await user.save();

        //email will be sent.
        await sendPasswordResetEmail(user.email, `${process.env.RESET_PASSWORD_URL}/reset-password/${resetToken}`);

        res.status(200).json({success:true,message:"Password reset email sent successfully."})
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({success:false,message:error.message});
    }
};

export const resetPassword = async(req,res) =>{
    try {
        //in -auth-routes- file , in url, we wrote the token that is why we also wrote here to get that token
        const {token}=req.params;

        const {password}=req.body;

        console.log(token);
        console.log(password);

        const user= await Userr.findOne({
            resetPasswordToken:token,
            resetPasswordExpiresAt:{$gt:Date.now()},

        });
        
        console.log(user);

        if(!user){
            return res.status(400).json({success:false,message:"Invalid or token is expired"});

        }

        //update the hash password
        const hashedPassword= await bcryptjs.hash(password,10);

        user.password=hashedPassword;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;

        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({success:true, message:"password reset successful"});


    } catch (error) {
        res.status(400).json({success:false,message:error.message});
        console.log(error)
    }
}

export const signout = async(req,res) =>{
    res.clearCookie("token");
    res.status(200).json({success:true, message:"Signout successfully."});
}

export const checkUserAuthentication = async(req, res) =>{
    try {
        const user = await Userr.findById(req.userId)

        if(!user){
            return res.status(400).json({success:false, message:"User not found"})
        }

        res.status(200).json({success:true, user:{ ...user._doc, password:undefined}});
    } catch (error) {

        res.status(400).json({success:false,message:error.message});
        
    }
}