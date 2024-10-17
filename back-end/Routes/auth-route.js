import express from "express";

const router = express.Router();

router.get("/signup", (req,res) => {
    res.send("the signup end point is working")
})

router.get("/signin", (req,res) => {
    res.send("the signin end point is working")
})

router.get("/signout", (req,res) => {
    res.send("the signout end point is working")
})

export default router;