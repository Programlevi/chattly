const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
const userModel = require('../model/dal/user');

exports.signup = async newUser => {
  newUser.password = await bcrypt.hash(newUser.password, 12);
  const user = await userModel.addOne(newUser);
  const token = signjwt(user.id);
  return {
    token,
    user
  };
};

exports.login = async userCred => {
  const { password, userName } = userCred;
  const user = await userModel.findOne({ userName });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AuthenticationError('Username or Password incorrect');
  }
  const token = signjwt(user.id);
  return {
    token,
    user
  };
};

exports.verifyUser = async token => {
  let user = null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    user = await userModel.findOne({ id: decoded.id });
  } catch (error) {
    user = null;
  }
  return user;
};

const signjwt = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: `${process.env.JWT_EXPIRES_IN.toString()}d`
  });
