const { combineResolvers } = require("graphql-resolvers");
const messageModel = require("../../model/dal/message");
const userModel = require("../../model/dal/user");
const userService = require("../../Services/userService");
const { authenticate } = require("../middlewares/authMiddleware");
const createJwtCookie = require("../../utils/createJwtCookie");
const pubSub = require("../../utils/pubSub");

exports.signup = async (parent, args, { res, req }) => {
  const { user, token } = await userService.signup(args.input);
  createJwtCookie(res, req, token);
  return { user, token };
};

exports.login = async (parent, args, { res, req }) => {
  const { user, token } = await userService.login(args.input);
  createJwtCookie(res, req, token);
  return { user, token };
};

exports.logout = async (parent, args, { res, req }) => {
  createJwtCookie(res, req, "Logged Out");
  return "Success";
};

exports.updateLastSeen = combineResolvers(
  authenticate,
  async (parent, args, { user }) => {
    const date = new Date();
    userModel.updateOne({ lastSeen: date.toISOString() }, { id: user.id });
    return "SUCCESS";
  }
);

exports.addMessage = combineResolvers(
  authenticate,
  async (parent, args, { user }) => {
    const message = await messageModel.addOne({
      ...args.input,
      author: user.id,
    });
    pubSub.publish("MESSAGE_ADDED", { messageAdded: message });
    return message;
  }
);
