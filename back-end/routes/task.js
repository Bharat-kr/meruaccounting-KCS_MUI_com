import express from "express";
import { authPass } from "../middleware/authMiddleware.js";
import { createTask, deleteTask, getTasks } from "../controllers/task.js";

const router = express.Router();

router
  .route("/")
  .get(authPass, getTasks)
  .post(authPass, createTask)
  .delete(authPass, deleteTask);

// router.route("/addMember/:id").post(authPass, addMember);

// router.route("/removeMember/:id").patch(authPass, removeMember);

// router.route("/projectLeader/:id").post(authPass, assignProjectLeader).patch(authPass , removeProjectLeader);

// router.route("/:id").get(authPass, getProjectById).patch(authPass, editProject);

export default router;
