import express from 'express';
import { authPass } from '../middleware/authMiddleware.js';

import {
  createTeam,
  addMember,
  updateMember,
  removeMember,
  getTeamById,
  getTeam,
  deleteTeam,
} from '../controllers/team.js';

const router = express.Router();

router.route('/create').post(authPass, createTeam);
router.route('/add/:id').post(authPass, addMember);
router.route('/updateMember').patch(authPass, updateMember);
router.route('/removeMember').delete(removeMember);
router.route('/getTeam/:id').get(authPass, getTeamById);
router.route('/getTeam').get(authPass, getTeam);
router.route('/').delete(authPass, deleteTeam);

export default router;
