require("dotenv").config();

const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

// const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const connectionString = `${process.env.HEROKU_POSTGRES_DB_URI}`

const pool = new Pool({
  connectionString: isProduction ? process.env.HEROKU_POSTGRES_DB_URI : connectionString,
  ssl: isProduction
});

module.exports = { pool };