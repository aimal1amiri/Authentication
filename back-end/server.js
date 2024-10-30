import express, { application } from "express"
import { databaseConnection } from "./Database/databaseConnection.js";
import dotenv from "dotenv";
import authRoutes from "./Routes/auth-route.js";
import cookieParser from "cookie-parser";
import cors from "cors";


const authentication =express();

dotenv.config();

const PORT =process.env.PORT

authentication.use(cors({origin:"http://localhost:5173", credentials:true})); //it is related to frontend. now it accepts request from frontend .

authentication.use(express.json()); //it will allow me to parse the incoming requests with JSON
authentication.use(cookieParser()); // it will allow me to parse the incoming cookies

authentication.get("/", (req,res)=>{
    res.send("it is working")
});
authentication.use("/api/auth",authRoutes);



authentication.listen(PORT,()=>{
    databaseConnection();
    console.log(`Server is started on port ${PORT}`);
});

