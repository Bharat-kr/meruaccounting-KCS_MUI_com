import express from 'express';
import { authPass } from '../middleware/authMiddleware.js';
import {
  createClient,
  getClient,
  getClientById,
  deleteClient,
  editClient,
} from '../controllers/client.js';

const router = express.Router();

router.route('/').post(authPass, createClient);

router.route('/getClient').get(authPass, getClient);

router
  .route('/:id')
  .get(authPass, getClientById)
  .delete(authPass, deleteClient)
  .patch(authPass, editClient);

export default router;
