const express = require('express');
const axios = require('axios');
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8081;

const db = require("./db");

app.post("/update_submission", async (request, response) => {
  let object = request.body;
  try {
    await db.updateSubmission(object);
    response.send("Success");
  } catch (error) {
    console.log(error)
    response.status(400).send('Error while getting list of repositories');
  }
});

app.get('/data', async (req, res) => {
  let table = req.query.table
  let season = req.query.season
  let player = req.query.player
  try {
    const players = await db.selectCustomers(table, season, player);
    res.send(players);
  } catch (error) {
    console.log(error)
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
    console.log(error)
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
    console.log(error)
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
    console.log(error)
    res.status(400).send('Error while getting list of repositories');
  }
});

app.get('/login', async (req, res) => {
  let { username, password } = req.query
  try {
    const login = await db.login(username, password);
    if (login) res.send("Login Successful")
    else res.send("Login Failed")
  } catch (error) {
    console.log(error)
    res.status(400).send('Error while getting list of repositories');
  }
})

app.get('/get_submissions', async (req, res) => {
  try {
    const rows = await db.getSubmissions();
    res.send(rows);
  } catch (error) {
    console.log(error)
    res.status(400).send('Error while getting list of repositories');
  }
})

app.get('/get_submission', async (req, res) => {
  let id = req.query.id
  try {
    const submission = await db.getSubmission(id);
    res.send(submission);
  } catch (error) {
    console.log(error)
    res.status(400).send('Error while getting list of repositories');
  }
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
