const { AuthenticationError } = require('apollo-server-express');

exports.authenticate = (parent, args, context) => {
  if (!context.user) {
    throw new AuthenticationError('Please log in again');
  }
};
