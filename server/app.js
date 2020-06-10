const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./graphql/typeDefs');

const app = express();

const apolloServer = new ApolloServer({
  typeDefs
});

apolloServer.applyMiddleware({ app });

module.exports = app;
