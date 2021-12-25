import express from 'express';
const router = express.Router();
import { authPass } from '../middleware/authMiddleware.js';
import {
  createProject,
  projectTeam,
  deleteProject,
  editProject,
  getProject,
} from '../controllers/project.js';

router.post('/', authPass, createProject);
router.get('/:id', authPass, getProject);
router.patch('/', authPass, projectTeam);
router.patch('/:id', authPass, editProject);
router.delete('/', authPass, deleteProject);
// router.post("/login", authController.login);

export default router;
