import express from 'express';
import {
  getAllTodo,
  createTodo,
  deleteTodo,
  updateTodo,
  updateStateTodo
} from './todo.controller';

const router = express.Router();

router.get('/', getAllTodo); // get all
router.post('/', createTodo); // create ToDo
router.put('/:todoId', updateTodo); // update ToDo
router.delete('/:todoId', deleteTodo); // delete ToDo
router.post('/state/:todoId', updateStateTodo); // update State ToDo

export default router;
