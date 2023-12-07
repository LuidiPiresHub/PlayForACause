import Joi from 'joi';

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().min(3).max(20).required(),
  password: Joi.string().min(4).max(30).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(30).required(),
});
