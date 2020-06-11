const queryResolvers = require('./queryResolvers');
const mutationResolvers = require('./mutationResolvers');

module.exports = {
  Query: queryResolvers,
  Mutation: mutationResolvers
};
