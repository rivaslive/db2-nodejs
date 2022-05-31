import express from 'express';
import validateMiddleware from '@middlewares/validate';
import {
  getAllUser,
  createUser,
  deleteUser,
  updateUser,
} from './user.controller';
import { createUserSchema, updateUserSchema } from './user.validate';

const router = express.Router();

router.get('/', getAllUser); // get all
router.post('/', validateMiddleware(createUserSchema), createUser); // create user
router.put('/:userId', validateMiddleware(updateUserSchema), updateUser); // update user
router.delete('/:userId', deleteUser); // delete user

export default router;
