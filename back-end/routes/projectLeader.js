import express from "express";

import { getProjectMembers } from "../controllers/projectLeader.js";

import { authPass } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/getMembers").post(authPass, getProjectMembers);

export default router;
