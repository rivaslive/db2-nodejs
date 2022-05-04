import express from 'express';
import {
  getAllTodo,
  createTodo,
  deleteUser,
  updateUser,
} from './todo.controller';

const router = express.Router();

router.get('/', getAllTodo); // get all
router.post('/', createTodo); // create user
router.put('/:userId', updateUser); // update user
router.delete('/:userId', deleteUser); // delete user

export default router;
