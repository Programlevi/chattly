exports.messages = async (parent, args, { loaders }) => {
  const { chatRoomMessagesLoader } = loaders;
  return await chatRoomMessagesLoader.load(parent.id);
};

exports.admin = async (parent, args, { loaders }) => {
  const { chatRoomAdminLoader } = loaders;
  return await chatRoomAdminLoader.load(parent.admin);
};
