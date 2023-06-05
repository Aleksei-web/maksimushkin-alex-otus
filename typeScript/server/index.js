const express = require('express');
require('dotenv').config();
const cors = require('cors');
const {
  readdirSync
} = require('fs');
// const crypto = require('crypto');

const db = require('./db')

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

db.connect(() => {
  console.log('DB connected')
})

readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

app.listen(PORT, () => {
  console.log('Server running on port ', PORT);
})