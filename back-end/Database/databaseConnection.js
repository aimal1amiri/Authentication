import mongoose from "mongoose";

export const databaseConnection = async () => {
    try {
        const connection= await mongoose.connect(process.env.MONGO_URI)
        console.log(`database is connected: ${connection.connection.host}`)
    } catch (error) {
        
        console.log("Error in connecting with database: ",error.message)
        process.exit(1) //1 is failure and 0 is success
    }
}