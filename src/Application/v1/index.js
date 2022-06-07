import express from 'express';
import verifyAuth from '@middlewares/auth';

import userRoutes from './user/user.route';
import todoRoutes from './todo/todo.route';
import publicRoutes from './upload/upload.route';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/todo', verifyAuth, todoRoutes);
router.use('/public', publicRoutes);

export default router;
