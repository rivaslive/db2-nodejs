import Joi from 'joi';

export const createUserSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        if (err.code === 'any.required') {
          err.message = 'Por favor ingrese su contraseña';
        }
      });
      return errors;
    }),
});

export const updateUserSchema = Joi.object({
  fullName: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
}).or('fullName', 'email', 'password');
