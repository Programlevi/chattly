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
            "email" VARCHAR(120) NOT NULL,
            "password" VARCHAR(60) NOT NULL,
            "photo" VARCHAR(120) NOT NULL DEFAULT 'default.jpg',
            "passChangedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
            UNIQUE("userName"),
            UNIQUE("email")
        );`);

    await transactionConnection.query(sql`CREATE TABLE IF NOT EXISTS "channel" (
            "id" UUID PRIMARY KEY DEFAULT UUID_GENERATE_V4(),
            "topic" VARCHAR(50) NOT NULL,
            "admin" UUID NOT NULL REFERENCES "userAccount"(id) ON DELETE CASCADE,
            "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
            UNIQUE("topic")
        );`);

    await transactionConnection.query(sql`CREATE TABLE IF NOT EXISTS "message" (
            "id" UUID PRIMARY KEY DEFAULT UUID_GENERATE_V4(),
            "message" VARCHAR(50) NOT NULL,
            "author" UUID NOT NULL REFERENCES "userAccount"(id) ON DELETE CASCADE,
            "recipient" UUID REFERENCES "userAccount"(id) ON DELETE CASCADE,
            "channel" UUID REFERENCES "channel"(id) ON DELETE CASCADE,
            "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
            UNIQUE("createdAt")
        );`);
  });
})();

module.exports = pool;
