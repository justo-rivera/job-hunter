require("dotenv").config();

const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

// const connectionString = `${process.env.HEROKU_POSTGRES_DB_URI}`

const pool = new Pool({
  connectionString: isProduction ? 'postgres://vkfarmfyscncmo:c23be9c3ac6c9d2086a5357906f40c6aa1cca34171cafbec3805070d72c25f40@ec2-54-155-99-116.eu-west-1.compute.amazonaws.com:5432/d6sameouvbeqlo' : connectionString,
  ssl: isProduction ? { rejectUnauthorized: false } : false
});

module.exports = { pool };