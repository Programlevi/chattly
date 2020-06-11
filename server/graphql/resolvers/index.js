const queryResolvers = require('./queryResolvers');
const mutationResolvers = require('./mutationResolvers');
const chatRoomResolvers = require('./chatRoomResolvers');
const messageResolvers = require('./messageResolvers');

module.exports = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
  ChatRoom: chatRoomResolvers,
  Message: messageResolvers
};
