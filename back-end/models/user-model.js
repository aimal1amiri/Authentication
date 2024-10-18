import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
     },
     password:{
        type: String,
        required: true,

     },
     name:{
        type:String,
        required:true,
     },
     lastLogin:{
        type:Date,
        default:Date.now,
     },
     isVerified:{
        type:Boolean,
        default:false
     },
     resetPasswordToken: String,
     resetPasswordExpiresAt:Date,
     verificationToken: String,
     verificationTokenExpiresAt:Date,
}, {timestamps:true});

// the timestamps will add two attributes to the schema like -createdat- and -updatedat- 


export const Userr =mongoose.model('User', userSchema);
