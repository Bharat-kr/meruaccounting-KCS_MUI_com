import express from "express";
import { getAllTeams } from "../controllers/admin.js";
import { getAllEmployee } from "../controllers/admin.js";

import { authPass } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/getAllEmployee").post(authPass, getAllEmployee);
router.route("/getAllTeams").post(authPass, getAllTeams);

export default router;
