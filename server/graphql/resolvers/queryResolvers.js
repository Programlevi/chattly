const userModel = require('../../model/dal/user');
const chatRoomModel = require('../../model/dal/chatRoom');
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

exports.chatRoom = async (parent, args, context) => {
  return await chatRoomModel.findOne(args.input);
};

exports.chatRooms = async (parent, args, context) => {
  return await chatRoomModel.find(args.input);
};
