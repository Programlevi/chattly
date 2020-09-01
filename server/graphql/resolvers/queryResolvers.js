const { combineResolvers } = require('graphql-resolvers');
const userModel = require('../../model/dal/user');
const messageModel = require('../../model/dal/message');
const { authenticate } = require('../middlewares/authMiddleware');

exports.onlineUsers = combineResolvers(
  authenticate,
  async (parent, args, { user }) => {
    return userModel.getOnlineUsers(user.id);
  }
);

exports.messages = async (parent, args) => {
  return await messageModel.find(args.input, args.queryOptions);
};

exports.auth = async (parent, args, { user, req }) => {
  if (!user) {
    return null;
  }
  return { token: req.cookies.jwt, user };
};
