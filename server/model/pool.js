const { createPool } = require('slonik');

const pool = createPool(
  'DATABASE_URL=postgres://postgres:levi007@localhost:5432/chatdb'
);

module.exports = pool;
