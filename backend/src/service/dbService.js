const dbPool = require('../config/database.js');

async function query(sql, params) {
  const [rows, ] = await dbPool.execute(sql, params=null);
  return rows;
}

module.exports = {
  query
}