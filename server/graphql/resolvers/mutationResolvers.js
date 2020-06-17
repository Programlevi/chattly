const userModel = require('../../model/dal/user');
const messageModel = require('../../model/dal/message');

exports.addUser = async (parent, args, context) => {
  return await userModel.addOne(args.input);
};

exports.addMessage = async (parent, args, context) => {
  return await messageModel.addOne(args.input);
};
// Remove all join chat room
