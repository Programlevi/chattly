const { createPool, sql } = require('slonik');

const pool = createPool(process.env.DATABASE_URL);

(async function () {
  await pool.transaction(async transactionConnection => {
    await transactionConnection.query(
      sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`
    );

    await transactionConnection.query(sql`CREATE TABLE IF NOT EXISTS "userAccount" (
            "id" UUID PRIMARY KEY DEFAULT UUID_GENERATE_V4(),
            "userName" VARCHAR(50) NOT NULL,
            "password" VARCHAR(60) NOT NULL,
            "passChangedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "lastSeen" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
            UNIQUE("userName")
        );`);

    await transactionConnection.query(sql`CREATE TABLE IF NOT EXISTS "message" (
            "id" UUID PRIMARY KEY DEFAULT UUID_GENERATE_V4(),
            "message" TEXT NOT NULL,
            "author" UUID NOT NULL REFERENCES "userAccount"(id) ON DELETE CASCADE,
            "recipient" UUID,
            "type" varchar(7) NOT NULL,
            "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
        );`);
  });
})();

module.exports = pool;
