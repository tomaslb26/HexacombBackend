const express = require('express');
const axios = require('axios');
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 8081;

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

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
