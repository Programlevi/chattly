const chatRoomRegModel = require('../../model/dal/chatRoomReg');

exports.admin = async (parent, args, { loaders }) => {
  const { chatRoomAdminLoader } = loaders;
  return await chatRoomAdminLoader.load(parent.admin);
};

exports.messages = async (parent, args, { loaders }) => {
  const { chatRoomMessagesLoader } = loaders;
  return await chatRoomMessagesLoader.load(parent.id);
};

exports.memberCount = async (parent, args, context) => {
  return await chatRoomRegModel.count({ chatRoom: parent.id });
};
