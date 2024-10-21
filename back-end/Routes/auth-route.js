import express from "express";
import { signup, login, signout , verifyEmail} from "../controllers/authentication-controller.js";

const router = express.Router();

router.post("/signup", signup)

router.post("/login", login);

router.post("/signout", signout);

router.post("/verify-email",verifyEmail);

export default router;