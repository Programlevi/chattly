const _ = require("lodash");
const userModel = require("../model/dal/user");
const DataLoader = require("dataloader");

exports.messageAuthorLoader = () => {
  return new DataLoader(userByUserIds);
};

//One user per id
const userByUserIds = async ids => {
  const users = await userModel.findByIds(ids, "id");
  const groupedBy = _.mapKeys(users, "id");
  return _.map(ids, id => groupedBy[id]);
};
