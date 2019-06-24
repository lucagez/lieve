const http = require('http');
const bombarder = require('./_bombarder');

const { log } = console;

const server = http.createServer((req, res) => {
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.end('hello');
});

server.listen(3000, async () => {
  const result = await bombarder();

  log(`bare node.js: ${result.requests.average} req/s`);

  process.exit(0);
});
