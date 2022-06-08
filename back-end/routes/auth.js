import express from "express";
import { authPass } from "../middleware/authMiddleware.js";
import {
  downloadApp,
  dateHours,
  register,
  login,
  commondata,
  teamCommondata,
  generateReportByIds,
  roleCheck,
  updateTimeZone,
} from "../controllers/auth.js";
import { body } from "express-validator";
import { generateReport } from "../controllers/report.js";

const router = express.Router();

router
  .route("/register", [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Please Provide Correct Password"),
  ])
  .post(register);

router.route("/login").post(login);
router.route("/download").get(downloadApp);

router.route("/commondata").post(authPass, commondata);
router.route("/dateHours").post(authPass, dateHours);
router.route("/teamCommondata").post(authPass, teamCommondata);
router.route("/generateReport").post(generateReportByIds);
router.route("/roleCheck").post(authPass, roleCheck);
router.route("/timeZone").patch(authPass, updateTimeZone);

export default router;
