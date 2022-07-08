const database = require('./database/models');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');

const server = app.listen(config.application.port, async () => {
  await database.sequelize[config.database.dropSchema ? 'sync' : 'authenticate']({ force: true });
  logger.info(`Listening to port ${config.application.port}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
