const queryResolvers = require('./queryResolvers');
const mutationResolvers = require('./mutationResolvers');
const messageResolvers = require('./messageResolvers');
const subscriptionResolvers = require('./subscriptionResolvers');

module.exports = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
  Subscription: subscriptionResolvers,
  Message: messageResolvers
};
