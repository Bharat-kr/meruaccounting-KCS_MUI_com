import express from "express";
import { getTime, updateTime } from "../controllers/screenshotDeleteTime.js";
import { adminPass } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.route("/").get(getTime).patch(adminPass, updateTime);

export default router;
