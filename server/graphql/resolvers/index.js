const queryResolvers = require('./queryResolvers');
const mutationResolvers = require('./mutationResolvers');
const messageResolvers = require('./messageResolvers');

module.exports = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
  Message: messageResolvers
};
