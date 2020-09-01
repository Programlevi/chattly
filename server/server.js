if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './config.env' });
}

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err);
  process.exit(1);
});

const { httpServer, apolloServer } = require('./app');

const port = process.env.PORT;

const server = httpServer.listen(port, () => {
  console.log(
    `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${port}${apolloServer.subscriptionsPath}`
  );
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down.');
  server.close(() => {
    console.log('Process terminated!');
  });
});
