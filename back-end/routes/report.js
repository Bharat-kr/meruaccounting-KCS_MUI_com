import express from "express";
import {
  generateReport,
  generateReportProject,
  generateReportClient,
  generateReportByUser,
  generateReportByProjectId,
} from "../controllers/report.js";

import { authPass } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(authPass, generateReport);
router.route("/project").post(authPass, generateReportProject);
router.route("/client").post(authPass, generateReportClient);
router.route("/user").post(authPass, generateReportByUser);
router.route("/:id").post(authPass, generateReportByProjectId);

export default router;
