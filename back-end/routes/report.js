import express from "express";
import {
  generateReport,
  saveReports,
  fetchReports,
  reportOptions,
  savedReports,
  deleteReports,
  editReports,
} from "../controllers/report.js";

import { authPass } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(authPass, generateReport);
router.route("/save").post(authPass, saveReports);
router.route("/saved").get(authPass, savedReports);
router.route("/fetch").post(fetchReports);
router.route("/options").post(authPass, reportOptions);
router.route("/delete").delete(authPass, deleteReports);
router.route("/edit").patch(authPass, editReports);

export default router;
