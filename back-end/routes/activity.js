import express from "express";
import {
  createActivity,
  createScreenShot,
  splitActivity,
  updateActivity,
  deleteScreenshot,
  deleteActivity,
  updateLastActive,
} from "../controllers/activity.js";
import { authPass } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(authPass, createActivity)
  .delete(authPass, deleteActivity);

router.route("/splitActivity").post(authPass, splitActivity);

router
  .route("/screenshot")
  .post(authPass, createScreenShot)
  .delete(authPass, deleteScreenshot);

router.route("/lastActive").post(authPass, updateLastActive);
router.route("/:id").patch(authPass, updateActivity);

export default router;
