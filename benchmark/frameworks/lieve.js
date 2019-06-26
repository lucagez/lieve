const http = require('http');
const Lieve = require('../../src/lieve');
const bombarder = require('./_bombarder');

const { log } = console;

const router = new Lieve();

router.GET('/', [], function (req, res) {
  // res.setHeader('content-type', 'text/plain; charset=utf-8');
  res.end('hello');
});

const server = http.createServer(router.start());

server.listen(3000, async () => {
  const result = await bombarder(2);
  
  log(`lieve: ${result} req/s`);
  process.exit(0);
});
