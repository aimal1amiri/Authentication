
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