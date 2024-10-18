import express, { application } from "express"
import { databaseConnection } from "./Database/databaseConnection.js";
import dotenv from "dotenv";
import authRoutes from "./Routes/auth-route.js";


const authentication =express();

dotenv.config();

const PORT =process.env.PORT
authentication.use(express.json()); //it will allow me to parse the incoming requests with JSON

authentication.get("/", (req,res)=>{
    res.send("it is working")
});
authentication.use("/api/auth",authRoutes);



authentication.listen(PORT,()=>{
    databaseConnection();
    console.log("Server is started on port 3000");
});

