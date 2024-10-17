import express, { application } from "express"
import { databaseConnection } from "./Database/databaseConnection.js";
import dotenv from "dotenv";
import authRoutes from "./Routes/auth-route.js";


const authentication =express();

dotenv.config();

authentication.get("/", (req,res)=>{
    res.send("it is working")
});
authentication.use("/api/auth",authRoutes);

authentication.listen(3000,()=>{
    databaseConnection();
    console.log("Server is started on port 3000");
});