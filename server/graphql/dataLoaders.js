const _ = require('lodash');
const userModel = require('../model/dal/user');
const chatRoomModel = require('../model/dal/chatRoom');
const messageModel = require('../model/dal/message');
const DataLoader = require('dataloader');

exports.chatRoomMessagesLoader = () => {
  return new DataLoader(messagesByChatRoomIds);
};

exports.chatRoomAdminLoader = () => {
  return new DataLoader(userByUserIds);
};

exports.messageAuthorLoader = () => {
  return new DataLoader(userByUserIds);
};

//One user per id
const userByUserIds = async ids => {
  const users = await userModel.findByIds(ids, 'id');
  const groupedBy = _.mapKeys(users, 'id');
  return _.map(ids, id => groupedBy[id]);
};

//Multiple messages per id
const messagesByChatRoomIds = async ids => {
  const messages = await messageModel.findByIds(ids, 'chatRoom');
  const groupedBy = _.groupBy(messages, message => message.chatRoom);
  return _.map(ids, id => groupedBy[id]);
};
