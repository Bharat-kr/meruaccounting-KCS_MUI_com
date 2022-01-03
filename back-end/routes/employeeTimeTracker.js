import express from 'express';
import { abc, con } from '../controllers/employeeTimeTracking';

const router = express.Router();

router.get('/:id', abc);
router.get('/timeCount', con);

export default router;
