import express from 'express';
import userRoutes from './user/user.route';
import todoRoutes from './todo/todo.route';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/todo', todoRoutes);

export default router;
