const userModel = require('../../model/dal/user');
const chatRoomModel = require('../../model/dal/chatRoom');
const messageModel = require('../../model/dal/message');

exports.addUser = async (parent, args, context) => {
  return await userModel.addOne(args.input);
};

exports.addChatRoom = async (parent, args, context) => {
  return await chatRoomModel.addOne(args.input);
};

exports.addMessage = async (parent, args, context) => {
  return await messageModel.addOne(args.input);
};
