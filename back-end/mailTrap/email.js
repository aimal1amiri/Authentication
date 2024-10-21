
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTempletes.js";

import { client,sender } from "./mailtrap-config.js";


export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient= [{email}]

    try {
        const response= await client.send({
            from:sender,
            to:recipient,
            subject:"Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken ),
            category:"Email Verification"
        })

        console.log("email send successfully", response)
    } catch (error) {
        throw new Error(`Error sending verification email : ${error}`);        
    }

}

export const sendWelcomeEmail=async(email,name)=>{
    const recipient=[{email}]

    try {
        const response=await client.send({
            from:sender,
            to:recipient,
            template_uuid:"5744fbd3-9e9d-4f68-b935-2ad55a7e6fb4",
            template_variables:{
                "company_info_name":"Cineos",
                name:name,

            },

        });

        console.log("Welcome Email sent successfully.",response);
    } catch (error) {

        console.error(`Error sending Welcome Email`,error);
        throw new Error(`Error sending Welcome Email: ${error}`);
        
    }
}