import express from 'express';
import verifyAuth from '@middlewares/auth';
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

router.get('/', verifyAuth, getAllUser); // get all
router.post('/signup', validateMiddleware(createUserSchema), signUp); // create user
router.post('/login', validateMiddleware(LoginUserSchema), login); // create user
router.put('/:userId', verifyAuth, validateMiddleware(updateUserSchema), updateUser); // update user
router.delete('/:userId', verifyAuth, deleteUser); // delete user

export default router;
