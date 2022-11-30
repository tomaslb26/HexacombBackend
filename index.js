const express = require('express');
const axios = require('axios');
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 8080;

const db = require("./db");


app.get('/data', async (req, res) => {
  let table = req.query.table
  let season = req.query.season
  let player = req.query.player
  try {
    const players = await db.selectCustomers(table, season, player);
    res.send(players);
  } catch (error) {
    res.status(400).send('Error while getting list of repositories');
  }
});

app.get('/stats', async (req, res) => {
  let table = req.query.table
  let season = req.query.season
  let stat = req.query.stat
  try {
    const players = await db.selectStat(table, season, stat);
    res.send(players);
  } catch (error) {
    res.status(400).send('Error while getting list of repositories');
  }
});

app.get('/db', async (req, res) => {
  let table = req.query.table
  let season = req.query.season
  let stat = req.query.stat
  let limit = req.query.limit
  try {
    const players = await db.selectTop(table, season, stat, limit);
    res.send(players);
  } catch (error) {
    res.status(400).send('Error while getting list of repositories');
  }
});

app.get('/insert', async (req, res) => {
  let name = req.query.name
  let player = req.query.player
  let x = req.query.x
  let y = req.query.y
  let z = req.query.z
  let first_item = req.query.first_item
  let second_item = req.query.second_item
  let third_item = req.query.third_item
  let fourth_item = req.query.fourth_item
  let image_url = req.query.image_url
  try {
    const answer = await db.insertShop(name, player, x, y, z, first_item, second_item, third_item, fourth_item, image_url);
    res.send(answer)
  } catch (error) {
    res.status(400).send('Error while getting list of repositories');
  }
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
