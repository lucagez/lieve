const express = require('express');
const bombarder = require('./_bombarder');

const { log } = console;

const app = express()

app.get('/', function (req, res) {
  res.end('hello');
});

app.listen(3000, async () => {
  const result = await bombarder(2);
  
  log(`express: ${result} req/s`);
  process.exit(0);
});
