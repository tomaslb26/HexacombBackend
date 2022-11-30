
async function connect() {
    if (global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`);
    global.connection = connection;
    return connection;
}

async function selectCustomers(table, season, player) {
    const conn = await connect();
    const [rows] = await conn.query(`SELECT * FROM ${table + "_" + season} WHERE player like "${player}";`);
    return rows;
}

async function selectTop(table, season, stat, limit) {
    const conn = await connect();
    const [rows] = await conn.query(`SELECT player, \`${stat}\` FROM ${table + "_" + season} ORDER BY \`${stat}\` DESC LIMIT ${limit};`);
    return rows;
}

async function selectStat(table, season, stat) {
    const conn = await connect();
    const [rows] = await conn.query(`SELECT player, \`${stat}\` FROM ${table + "_" + season}; `);
    return rows;
}

async function insertShop(name, player, x, y, z, first_item, second_item, third_item, fourth_item, image_url) {
    const conn = await connect();
    let queryString = `INSERT INTO shops (name, player, x, y, z, item_1, item_2, item_3, item_4, image_url) VALUES ('${name}', '${player}', ${Number(x)}, ${Number(y)}, ${Number(z)}, '${first_item}', '${second_item}', '${third_item}', '${fourth_item}', '${image_url}')`
    console.log(queryString)
    await conn.query(queryString);
}

module.exports = { selectCustomers, selectStat, selectTop, insertShop }