import express from 'express';
import { getAllUser, createUser, deleteUser } from './user.controller';

const router = express.Router();

router.get('/', getAllUser);
router.post('/', createUser);
router.put('/', createUser);
router.delete('/', deleteUser);

export default router;
