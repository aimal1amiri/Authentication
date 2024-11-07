import express from "express";
import { signup, login, signout , verifyEmail, forgotPassword, resetPassword , checkUserAuthentication} from "../controllers/authentication-controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

//when page is refreshed, it will check, if the user is authenticated or not.
router.get("/user-check-auth", verifyToken, checkUserAuthentication);

router.post("/signup", signup)

router.post("/login", login);

router.post("/signout", signout);

router.post("/verify-email",verifyEmail);

router.post("/forgot-password",forgotPassword);

router.post(`/reset-password:token`, resetPassword)

export default router;