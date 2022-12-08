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

async function insertShop(id, type, name, player, desc, x, y, z, first_item, second_item, third_item, image_url) {
    const conn = await connect();
    let queryString = `INSERT INTO shops (id, type, name, player, description, x, y, z, item_1, item_2, item_3, image_url, status, review) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    await conn.query(queryString, [Number(id), type, name, player, desc, Number(x), Number(y), Number(z), first_item, second_item, third_item, image_url, "pending", ""]);
}

async function login(username, password) {
    const bcrypt = require('bcrypt');
    const conn = await connect();
    let queryString = "SELECT * FROM auth WHERE username LIKE ?"
    const [rows] = await conn.query(queryString, [username])
    if (rows.length === 0) return false
    return await bcrypt.compare(password, String(rows[0].password))
}

async function getSubmissions() {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM shops;");
    return rows;
}

async function updateSubmission(object) {
    const conn = await connect();
    let queryString = "UPDATE shops SET name = ?, player = ?, description = ?, x = ?, y = ?, z = ?, item_1 = ?, item_2 = ?, item_3 = ?, review = ?, status = ? WHERE id = ?"
    await conn.query(queryString, [object.name, object.player, object.description, object.x, object.y, object.z, object.item_1, object.item_2, object.item_3, object.review, object.status, Number(object.id)], function (err) {
        console.log('Query error: ' + err);
    });
}

async function getSubmission(id) {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM shops where id = ?", id);
    return rows;
}

module.exports = { selectCustomers, selectStat, selectTop, insertShop, login, getSubmissions, updateSubmission, getSubmission }