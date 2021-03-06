DROP TABLE IF EXISTS tweets CASCADE;

CREATE TABLE "tweets" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "user_id" INTEGER REFERENCES users(id) ON DELETE CASCADE,
  "message" TEXT NOT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);