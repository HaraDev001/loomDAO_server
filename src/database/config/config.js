const { database: dbSettings } = require('../../config/config');

const config = {
  development: {
    username: dbSettings.development.username,
    password: dbSettings.development.password,
    database: dbSettings.development.database,
    host: dbSettings.development.host,
    dialect: 'postgres',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
  production: {
    username: dbSettings.production.username,
    password: dbSettings.production.password,
    database: dbSettings.production.database,
    host: dbSettings.production.host,
    dialect: 'postgres',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
};
module.exports = {
  ...config,
};
