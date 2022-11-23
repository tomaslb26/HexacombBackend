
async function connect() {
    if (global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`);
    global.connection = connection;
    return connection;
}

async function selectCustomers(table, season) {
    const conn = await connect();
    const [rows] = await conn.query(`SELECT * FROM ${table + "_" + season};`);
    return rows;
}

module.exports = { selectCustomers }