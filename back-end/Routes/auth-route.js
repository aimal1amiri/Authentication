import express from "express";
import { signup, login, signout } from "../controllers/authentication-controller.js";

const router = express.Router();

router.get("/signup", signup)

router.get("/login", login);

router.get("/signout", signout);

export default router;