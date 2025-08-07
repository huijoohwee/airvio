/**
 * local server entry file, for local development
 */
import app from './app.js';
import getPort from 'get-port';

/**
 * start server with port
 */
const PORT = process.env.PORT || 3000;

getPort({ port: parseInt(PORT) }).then((availablePort) => {
  const server = app.listen(availablePort, () => {
    console.log(`Server ready on port ${availablePort}`);
  });

  /**
   * close server
   */
  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.log('SIGINT signal received');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });
});

export default app;