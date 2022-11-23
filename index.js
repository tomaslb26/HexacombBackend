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
  try {
    const players = await db.selectCustomers(table, season);
    res.send(players);
  } catch (error) {
    res.status(400).send('Error while getting list of repositories');
  }
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
