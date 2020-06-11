exports.author = async (parent, args, { loaders }) => {
  const { messageAuthorLoader } = loaders;
  return await messageAuthorLoader.load(parent.author);
};
