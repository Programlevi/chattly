const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const dataLoaders = require('./graphql/dataLoaders');

const app = express();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    return {
      loaders: {
        messageAuthorLoader: dataLoaders.messageAuthorLoader()
      }
    };
  }
});

apolloServer.applyMiddleware({ app });

module.exports = app;
