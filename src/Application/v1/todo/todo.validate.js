import Joi from 'joi';
import { statusToDoType } from './todo.model';

export const createTodoSchema = Joi.object({
  content: Joi.string().required(),
  user: Joi.string().required(),
});

export const updateTodoSchema = Joi.object({
  content: Joi.string(),
  user: Joi.string(),
  finished_at: Joi.date(),
}).or('content', 'user', 'finished_at');

export const updateStateTodoSchema = Joi.object({
  status: Joi.string().required().valid(...statusToDoType),
});
