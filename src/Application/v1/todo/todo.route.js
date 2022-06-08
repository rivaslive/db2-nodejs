import express from 'express';
import verifyAuth from '@middlewares/auth';
import validateMiddleware from '@middlewares/validate';
import {
  getAllTodo,
  createTodo,
  deleteTodo,
  updateTodo,
  updateStateTodo, getTodoById,
} from './todo.controller';
import {
  createTodoSchema,
  updateStateTodoSchema,
  updateTodoSchema,
} from './todo.validate';

const router = express.Router();

router.get('/', verifyAuth, getAllTodo); // get all
router.get('/:todoId', verifyAuth, getTodoById); // get all
router.post('/', verifyAuth, validateMiddleware(createTodoSchema), createTodo); // create ToDo
router.put('/:todoId', verifyAuth, validateMiddleware(updateTodoSchema), updateTodo); // update ToDo
router.delete('/:todoId', verifyAuth, deleteTodo); // delete ToDo
router.post(
  '/state/:todoId',
  verifyAuth,
  validateMiddleware(updateStateTodoSchema),
  updateStateTodo
);

export default router;
