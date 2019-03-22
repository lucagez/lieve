const http = require('http');

const cors = require('cors');
const { Lieve, _express } = require('../dist/lieve');

const { router } = new Lieve({
  '/': {
    'use': {
      'cors': (req, res) => _express(req, res, cors),
    },
    'GET': (req, res) => {
      // const { params } = req;
      // const [user, lol] = params;
      res.send(JSON.stringify({ hello: 'world' }), 'application/json');
    },
  },
});

const server = http.createServer();

server.on('request', router);

server.listen(4003);
