import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  // Environment variables
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'stag', 'production')
    .required(),

  // Server configuration port running
  PORT: Joi.number().default(3000),

  // gRPC server configuration
  GRPC_HOST: Joi.string().required(),
  GRPC_PORT: Joi.string().required(),

  // configuration for database
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().optional(),
  DB_NAME: Joi.string().required(),

  // JWT configuration
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION: Joi.string().default('1d'),

  // Redis configuration
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
  REDIS_PASS: Joi.string().optional(),
  REDIS_DB: Joi.number().default(0),
});

const getConfiguration = () => {
  return {
    // Environment variables
    NODE_ENV: process.env.NODE_ENV,
    // Server configuration port running
    PORT: process.env.PORT,

    // gRPC server configuration
    GRPC_HOST: process.env.GRPC_HOST,
    GRPC_PORT: Number(process.env.GRPC_PORT),

    // configuration for database
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,

    // JWT configuration
    JWT_SECRET: process.env.JWT_SECRET,
    // calculate expiration time by seconds
    JWT_EXPIRATION: Number(process.env.JWT_EXPIRATION),

    // Redis configuration
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: Number(process.env.REDIS_PORT),
    REDIS_PASS: process.env.REDIS_PASS,
    REDIS_DB: Number(process.env.REDIS_DB ?? 0),
    REDIS_KEY_PREFIX: 'user_be_service:',
  };
};

export const CONFIGURATION = getConfiguration();
console.log('Configuration: ', CONFIGURATION);
