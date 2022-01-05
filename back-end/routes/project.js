import express from 'express';
import { authPass } from '../middleware/authMiddleware.js';
import {
  createProject,
  deleteProject,
  editProject,
  getProjectById,
  getProject,
  addEmailToProject,
  assignProjectLeader,
} from '../controllers/project.js';

const router = express.Router();

router
  .route('/')
  .get(authPass, getProject)
  .post(authPass, createProject)
  .delete(authPass, deleteProject);

router.route('/addMember/:id').post(authPass, addEmailToProject);

router.route('/projectLeader/:id').post(authPass, assignProjectLeader);

router.route('/:id').get(authPass, getProjectById).patch(authPass, editProject);

export default router;
