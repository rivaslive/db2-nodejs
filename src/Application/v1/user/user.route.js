import express from 'express';
import {
  getAllUser,
  createUser,
  deleteUser,
  updateUser,
} from './user.controller';

const router = express.Router();

router.get('/', getAllUser); // get all
router.post('/', createUser); // create user
router.put('/:userId', updateUser); // update user
router.delete('/:userId', deleteUser); // delete user

export default router;
