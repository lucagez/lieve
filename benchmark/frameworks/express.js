const express = require('express');
const bombarder = require('./_bombarder');

const { log } = console;

const app = express()

app.disable('etag');
app.disable('x-powered-by');

app.get('/', function (req, res) {
  res.send('hello');
});

app.listen(3000, async () => {
  const result = await bombarder();

  log(`express: ${result.requests.average} req/s`);

  process.exit(0);
});
