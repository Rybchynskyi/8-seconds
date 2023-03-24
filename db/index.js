const env = require("../env.json");
module.exports = {
  host     : env.db_host,
  user     : env.db_user,
  password : env.db_password,
  database : env.db_database,
  port     : env.db_port
}