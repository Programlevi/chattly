const userModel = require('../../model/dal/user');
const messageModel = require('../../model/dal/message');

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
