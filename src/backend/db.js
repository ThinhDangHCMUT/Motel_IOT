const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'D@ngthinh1402',
  database: 'motel_schema2'
});

pool.query = util.promisify(pool.query);

module.exports = pool;
