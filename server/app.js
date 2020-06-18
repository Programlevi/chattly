const http = require('http');
const express = require('express');
const cookieParser = require('cookie-parser');
const { ApolloServer, AuthenticationError } = require('apollo-server-express');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const userService = require('./services/userService');
const dataLoaders = require('./graphql/dataLoaders');

const app = express();

app.enable('trust proxy');

app.use(cookieParser());

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    onConnect: async connectionParams => {
      const user = await userService.verifyUser(connectionParams.token);
      if (!user) {
        console.log(user);
        throw new AuthenticationError('Please login again');
      }
      return {
        user
      };
    }
  },
  context: async ({ req, res, connection }) => {
    let context = {
      loaders: {
        messageAuthorLoader: dataLoaders.messageAuthorLoader()
      }
    };

    if (connection) {
      context = { ...context, user: connection.context.user };
    } else {
      const user = await userService.verifyUser(req.cookies.jwt);
      context = { ...context, req, res, user };
    }

    return context;
  }
});

apolloServer.applyMiddleware({ app });

const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

module.exports = { httpServer, apolloServer };
