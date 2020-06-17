const messageModel = require('../../model/dal/message');
const userService = require('../../Services/userService');
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

exports.addMessage = async (parent, args, context) => {
  return await messageModel.addOne(args.input);
};
