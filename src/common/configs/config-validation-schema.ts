import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  // Environment variables
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'stag', 'production')
    .required(),

  // Server configuration port running
  PORT: Joi.number().default(3000),

  // configuration for database
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  // DB_PASS: Joi.string().required(),
  DB_NAME: Joi.string().required(),
});
