import express from "express";
import { getTime, updateTime } from "../controllers/screenshotDeleteTime.js";
import { adminPass } from "../middleware/roleMiddleware.js";
import { authPass } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getTime).patch(authPass, adminPass, updateTime);

export default router;
