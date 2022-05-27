require('dotenv').config();

module.exports = {

  type: "postgres",
  host: "localhost",
  port: 5433,
  username: process.env.USER,
  password: process.env.PASS,
  database: process.env.DATABASE,
  entities: [
    "src/models/**/*.ts"
 ],
 migrations: [
  "src/database/migrations/**/*.ts"
],
 cli:{
  migrationsDir: "src/database/migrations/",
  entitiesDir: "src/models"
  }

};
