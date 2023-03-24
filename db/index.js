const env = require("../env.json");

const dbHost = env.LOCAL_DB_HOST || env.GLOBAL_DB_HOST;
const dbUsername = env.LOCAL_DB_USER || env.LOCAL_DB_USER;
const dbPassword = env.LOCAL_DB_PASSWORD || env.GLOBAL_DB_PASSWORD;
const dbDataBase = env.LOCAL_DB_DATABASE || env.GLOBAL_DB_DATABASE;
const dbPort = env.LOCAL_DB_PORT || env.GLOBAL_DB_PORT;

module.exports = {
  host     : dbHost,
  user     : dbUsername,
  password : dbPassword,
  database : dbDataBase,
  port     : dbPort
}