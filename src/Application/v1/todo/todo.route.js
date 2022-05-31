import express from 'express';
import validateMiddleware from '@middlewares/validate';
import {
  getAllTodo,
  createTodo,
  deleteTodo,
  updateTodo,
  updateStateTodo,
} from './todo.controller';
import {
  createTodoSchema,
  updateStateTodoSchema,
  updateTodoSchema,
} from './todo.validate';

const router = express.Router();

router.get('/', getAllTodo); // get all
router.post('/', validateMiddleware(createTodoSchema), createTodo); // create ToDo
router.put('/:todoId', validateMiddleware(updateTodoSchema), updateTodo); // update ToDo
router.delete('/:todoId', deleteTodo); // delete ToDo
router.post(
  '/state/:todoId',
  validateMiddleware(updateStateTodoSchema),
  updateStateTodo
);

export default router;
