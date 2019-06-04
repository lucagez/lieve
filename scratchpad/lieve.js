const http = require('http');
const Lieve = require('../dist/lieve');

const router = new Lieve();

router.GET('/', [], function (req, res) {
  res.setHeader('content-type', 'text/plain; charset=utf-8');
  res.end('hello');
});

const server = http.createServer(router.start());

server.listen(3000);
