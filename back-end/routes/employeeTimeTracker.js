import express from 'express';
import { abc, con } from '../controllers/employeeTimeTracking';

const router = express.Router();

router.get('/timeCount', con);

router.get('/:id', abc);

export default router;
