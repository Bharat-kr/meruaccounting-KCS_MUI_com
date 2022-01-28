import express from "express";
import {
  generateReportOne,
  generateReportTwo,
  generateReportThree,
} from "../controllers/report.js";

import { authPass } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/1").get(authPass, generateReportOne);
router.route("/2").get(authPass, generateReportTwo);
router.route("/3").get(authPass, generateReportThree);

export default router;
