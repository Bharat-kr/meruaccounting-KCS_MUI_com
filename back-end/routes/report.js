import express from "express";
import {
  generateReport,
  saveReports,
  fetchReports,
  reportOptions,
} from "../controllers/report.js";

import { authPass } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(authPass, generateReport);
router.route("/save").post(authPass, saveReports);
router.route("/fetch").post(fetchReports);
router.route("/options").post(authPass, reportOptions);

export default router;
