const { combineResolvers } = require('graphql-resolvers');
const messageModel = require('../../model/dal/message');
const userService = require('../../services/userService');
const { authenticate } = require('../middlewares/authMiddleware');
const createJwtCookie = require('../../utils/createJwtCookie');

exports.signup = async (parent, args, { res, req }) => {
  const { user, token } = await userService.signup(args.input);
  createJwtCookie(res, req, token);
  return user;
};

exports.login = async (parent, args, { res, req }) => {
  const { user, token } = await userService.login(args.input);
  createJwtCookie(res, req, token);
  return user;
};

exports.logout = async (parent, args, { res, req }) => {
  createJwtCookie(res, req, 'Logged Out');
  return 'Success';
};

exports.addMessage = combineResolvers(
  authenticate,
  async (parent, args, { user }) => {
    return await messageModel.addOne({ ...args.input, author: user.id });
  }
);
