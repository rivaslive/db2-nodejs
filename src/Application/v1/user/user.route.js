import express from 'express';
import validateMiddleware from '@middlewares/validate';
import {
  getAllUser,
  createUser,
  deleteUser,
  updateUser,
  login,
} from './user.controller';
import {
  createUserSchema,
  LoginUserSchema,
  updateUserSchema,
} from './user.validate';

const router = express.Router();

router.get('/', getAllUser); // get all
router.post('/', validateMiddleware(createUserSchema), createUser); // create user
router.post('/login', validateMiddleware(LoginUserSchema), login); // create user
router.put('/:userId', validateMiddleware(updateUserSchema), updateUser); // update user
router.delete('/:userId', deleteUser); // delete user

export default router;
