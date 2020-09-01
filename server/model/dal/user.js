const { sql } = require('slonik');
const pool = require('../pool');
const Entity = require('./Entity');

class User extends Entity {
  constructor() {
    super('userAccount', ['userName', 'password', 'lastSeen']);
  }

  getOnlineUsers = async currentUserId => {
    const res = await pool.query(sql`
      SELECT * FROM ${sql.identifier([this.tableName])} WHERE ${sql.identifier([
      'lastSeen'
    ])} > (now() - '00:00:10'::interval) AND ${sql.identifier([
      'id'
    ])} != ${currentUserId}
    `);
    return res.rows;
  };
}

module.exports = new User();
