const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
    NODE_ENV: Joi.string().description('environment of the application'),
    PORT: Joi.number().description('port on which the application runs'),
    DEV_DB_USERNAME: Joi.string().description('username of the database operator'),
    DEV_DB_PASSWORD: Joi.string().description('password of the database operator account'),
    DEV_DB_NAME: Joi.string().description('development database name'),
    DEV_DB_HOST: Joi.string().description('http host of the development database server'),
    PROD_DB_USERNAME: Joi.string().description('username of the database operator'),
    PROD_DB_PASSWORD: Joi.string().description('password of the database operator account'),
    PROD_DB_NAME: Joi.string().description('http host of the development database server'),
    PROD_DB_HOST: Joi.string().description('http host of the development database server'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  application: {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
  },
  database: {
    development: {
      username: envVars.DEV_DB_USERNAME,
      password: envVars.DEV_DB_PASSWORD,
      database: envVars.DEV_DB_NAME,
      host: envVars.DEV_DB_HOST,
    },
    production: {
      username: envVars.PROD_DB_USERNAME,
      password: envVars.PROD_DB_PASSWORD,
      database: envVars.PROD_DB_NAME,
      host: envVars.PROD_DB_HOST,
    },
    dropSchema: true,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      secure: envVars.SMTP_SECURE,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
};
