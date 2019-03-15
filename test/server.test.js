const http = require('http');
// const Lieve = require('../src/lieve');
const Lieve = require('../dist/lieve');

const { router } = new Lieve({
  '/users': {
    'GET': ({ req, res }) => {
      // res.setHeader('content-type', 'application/json')
      // res.end(JSON.stringify({hello: 'world'}))
      res.send('application/json', JSON.stringify({ hello: 'world' }))
    },
  }
});

const server = http.createServer();

server.on('request', router);

server.listen(4003);