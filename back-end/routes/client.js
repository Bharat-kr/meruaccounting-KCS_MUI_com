import express from "express";
const router = express.Router();
import {
  createClient,
  getClient,
  getClientProjects,
  deleteClient,
  editClient,
} from "../controllers/client.js";
import { authPass } from "../middleware/authMiddleware.js";

router
  .route("/")
  .post(authPass, createClient)
  .patch(authPass, editClient)
  .delete(authPass, deleteClient);
router.route("/getClient").get(authPass, getClient);
router.route("/getClientProjects").get(authPass, getClientProjects);

export default router;
