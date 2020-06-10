const Entity = require('./Entity');

module.exports = new Entity('userAccount', [
  'userName',
  'email',
  'password',
  'photo'
]);
