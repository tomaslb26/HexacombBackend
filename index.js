const express = require('express');
const axios = require('axios');
const cors = require("cors");
const { Client, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

const app = express();
app.use(cors());
const PORT = process.env.PORT || 8081;

const db = require("./db");
client.login("MTA0NzYyNzkwODE0MDc2NTMyNQ.GAD7dN.7N2TtK70N9y4uSlKvDSY08sugsOgyzEeWhOB6U")


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
  let id = req.query.id
  let type = req.query.type
  let name = req.query.name
  let player = req.query.player
  let desc = req.query.desc
  let x = req.query.x
  let y = req.query.y
  let z = req.query.z
  let first_item = req.query.first_item
  let second_item = req.query.second_item
  let third_item = req.query.third_item
  let image_url = req.query.image_url
  try {
    await db.insertShop(id, type, name, player, desc, x, y, z, first_item, second_item, third_item, image_url);
    res.send("Success")
  } catch (error) {
    res.status(400).send('Error while getting list of repositories');
  }
});

app.get('/list', async (req, res) => {
  try {
    const guild = client.guilds.cache.find((g) => g.id === "803135919792193537");
    if (!guild)
      return console.log(`Can't find any guild with the ID "${id}"`);

    guild.members
      .fetch()
      .then((members) =>
        res.send(members)
      );
  } catch (error) {
    res.status(400).send('Error while getting list of members');
  }
});


app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
