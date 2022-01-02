import express from 'express';
import { authPass } from '../middleware/authMiddleware.js';
import { register, login, commondata } from '../controllers/auth.js';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/commondata').get(authPass, commondata);

export default router;
