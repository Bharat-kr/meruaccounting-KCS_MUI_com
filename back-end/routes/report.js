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

router.route("/").get(authPass, generateReport);
router.route("/project").get(authPass, generateReportProject);
router.route("/client").get(authPass, generateReportClient);
router.route("/user").get(authPass, generateReportByUser);
router.route("/:id").get(authPass, generateReportByProjectId);

export default router;
