const express = require('express');
const axios = require('axios');
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 8081;

const db = require("./db");


app.post('/', async (req, res) => {
  const table = req.query.table;
  try {
    const players = await db.selectCustomers(table);
    res.send(players);
  } catch (error) {
    res.status(400).send('Error while getting list of repositories');
  }
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
