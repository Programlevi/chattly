const { combineResolvers } = require('graphql-resolvers');
const userModel = require('../../model/dal/user');
const messageModel = require('../../model/dal/message');
// const { authenticate } = require('../middlewares/authMiddleware');

exports.user = async (parent, args, context) => {
  return await userModel.findOne(args.input);
};

exports.users = async (parent, args, context) => {
  return await userModel.find(args.input);
};

exports.message = async (parent, args, context) => {
  return await messageModel.findOne(args.input);
};

exports.messages = async (parent, args, context) => {
  return await messageModel.find(args.input);
};

exports.auth = async (parent, args, { user, req }) => {
  if (!user) {
    return null;
  }
  return { token: req.cookies.jwt, user };
};
