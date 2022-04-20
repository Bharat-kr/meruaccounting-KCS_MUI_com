import express from "express";
import { forgotPassword, ResetPassword } from "../controllers/Forgot.js";
import { authPass } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(forgotPassword);
router.route("/reset").post(authPass, ResetPassword);

export default router;
