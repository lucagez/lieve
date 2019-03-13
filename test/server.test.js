const http = require('http');
const Lieve = require('../dist/lieve');

const { router } = new Lieve({
  '/users': {
    'GET': ({ req, res }) => res.end(JSON.stringify({ hello: 'world' })),
  }
});

const server = http.createServer();

server.on('request', router);

server.listen(3000);