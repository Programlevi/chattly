require('dotenv').config({ path: './config.env' });

const { httpServer, apolloServer } = require('./app');

const port = process.env.PORT;

httpServer.listen(port, () => {
  console.log(
    `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${port}${apolloServer.subscriptionsPath}`
  );
});
