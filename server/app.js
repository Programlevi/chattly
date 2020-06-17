const express = require('express');
const cookieParser = require('cookie-parser');
const { ApolloServer } = require('apollo-server-express');

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
  context: async ({ req, res }) => {
    const user = await userService.verifyUser(req.cookies.jwt);
    return {
      req,
      res,
      user,
      loaders: {
        messageAuthorLoader: dataLoaders.messageAuthorLoader()
      }
    };
  }
});

apolloServer.applyMiddleware({ app });

module.exports = app;
