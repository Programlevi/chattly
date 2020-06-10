const Entity = require('./Entity');

module.exports = new Entity('message', [
  'message',
  'author',
  'recipient',
  'channel'
]);
