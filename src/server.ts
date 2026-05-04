import app from './app';
import logger from './config/logger';

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  logger.info(`🚀 Server is running on port ${PORT}`);
});

process.on('unhandledRejection', (err: any) => {
  logger.error('Unhandled Rejection! Shutting down...');
  logger.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err: any) => {
  logger.error('Uncaught Exception! Shutting down...');
  logger.error(err.name, err.message);
  process.exit(1);
});
