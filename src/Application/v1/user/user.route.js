import express from 'express';
import validateMiddleware from '@middlewares/validate';
import {
  getAllUser,
  signUp,
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
router.post('/signup', validateMiddleware(createUserSchema), signUp); // create user
router.post('/login', validateMiddleware(LoginUserSchema), login); // create user
router.put('/:userId', validateMiddleware(updateUserSchema), updateUser); // update user
router.delete('/:userId', deleteUser); // delete user

export default router;
