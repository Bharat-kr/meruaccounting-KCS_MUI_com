import express from "express";
import {
  generateReport,
  saveReports,
  fetchReports,
} from "../controllers/report.js";

import { authPass } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(authPass, generateReport);
router.route("/save").post(authPass, saveReports);
router.route("/fetch").post(authPass, fetchReports);

export default router;
