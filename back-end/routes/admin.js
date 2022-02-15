import express from "express";
import { getAllTeams } from "../controllers/admin.js";
import { getAllEmployee, adminCommondata } from "../controllers/admin.js";

import { authPass } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/getAllEmployee").post(authPass, getAllEmployee);
router.route("/getAllTeams").post(authPass, getAllTeams);
router.route("/getCommonData").post(authPass, adminCommondata);

export default router;
