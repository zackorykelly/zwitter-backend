// Dependencies
require("dotenv").config();
const fs = require("fs");
const Client = require("pg-native");

// Connect to db as specified in .env
const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable`;
const client = new Client();

// Load and sync schema files
const runSchema = () => {
  const schemaFiles = fs.readdirSync("./db/schema");

  for (const file of schemaFiles) {
    const sql = fs.readFileSync(`./db/schema/${file}`, "utf8");
    console.log(`Running schema ${file}`);
    client.querySync(sql);
  }
};

//Populate db using seeds
const runSeeds = () => {
  const seedFiles = fs.readdirSync("./db/seeds");

  for (const file of seedFiles) {
    const sql = fs.readFileSync(`./db/seeds/${file}`);
    console.log(`Running seed ${file}`);
    client.querySync(sql);
  }
};

try {
  client.connectSync(connectionString);
  runSchema();
  runSeeds();
  client.end();
  console.log("Reset complete");
} catch (err) {
  console.error(`Reset failed due to: ${err}`);
  client.end();
}
