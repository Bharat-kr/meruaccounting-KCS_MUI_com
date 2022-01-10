import express from 'express';
const router = express.Router();
import {
  createClient,
  getClient,
  getClientById,
  deleteClient,
  editClient,
} from '../controllers/client.js';
import { authPass } from '../middleware/authMiddleware.js';

router.route('/').post(authPass, createClient);

router.route('/getClient').get(authPass, getClient);

router
  .route('/:id')
  .get(authPass, getClientById)
  .delete(authPass, deleteClient)
  .patch(authPass, editClient);

export default router;
