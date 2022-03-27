import express from "express";
import {
  generateReport,
  saveReports,
  fetchReports,
  reportOptions,
  savedReports,
  deleteReports,
  editReports,
  downloadPdf,
} from "../controllers/report.js";

import { authPass } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(authPass, generateReport);
router.route("/save").post(authPass, saveReports);
router.route("/saved").get(authPass, savedReports);
router.route("/fetch").post(fetchReports);
router.route("/options").post(authPass, reportOptions);
router.route("/delete/:url").delete(authPass, deleteReports);
router.route("/download/:url").get(downloadPdf);
router.route("/edit").patch(authPass, editReports);

export default router;
