const { withFilter } = require('apollo-server-express');
const pubSub = require('../../utils/pubSub');

exports.messageAdded = {
  subscribe: withFilter(
    (parent, args) => pubSub.asyncIterator(['MESSAGE_ADDED']),
    (parent, args, { user }) => {
      return parent.messageAdded.author !== user.id;
    }
  )
};
