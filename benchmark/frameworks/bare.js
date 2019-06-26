const http = require('http');
const bombarder = require('./_bombarder');

const { log } = console;

const server = http.createServer((req, res) => {
  res.end('hello');
});

server.listen(3000, async () => {
  const result = await bombarder(2);
  
  log(`bare: ${result} req/s`);
  process.exit(0);
});
