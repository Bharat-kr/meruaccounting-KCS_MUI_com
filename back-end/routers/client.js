import express from 'express';
const router = express.Router();
import {
  createClient,
  getClient,
  getClientProjects,
  deleteClient,
  editClient,
} from '../controllers/clientController.js';
import { authPass } from '../controllers/authController.js';

router
  .route('/')
  .post(authPass, createClient)
  .patch(authPass, editClient)
  .delete(authPass, deleteClient);
router.route('/getClient').get(authPass, getClient);
router.route('/getClientProjects').post(authPass, getClientProjects);

// router.post("/login", authController.login);

export default router;
