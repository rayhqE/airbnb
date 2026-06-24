const mySql = require("mysql2");
const pool = mySql.createPool({
  host: "localhost",
  user: "root",
  password: "home",
  database: "airbnb",
});

module.exports = pool.promise();
