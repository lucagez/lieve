const http = require('http');

const cors = require('cors');
const { Lieve, _express } = require('../dist/lieve');

const middle = (req, res) => {
  const { next } = req;
  console.log('middle');
  next(req, res);
};

const last = (req, res) => {
  const { params } = req;
  // console.log(params);
  res.send(JSON.stringify({ hello: 'world' }), 'application/json');
};

const lol = {
  'extend': '/users',
  '/': {
    'GET': last,
  },
  '/id': {
    'GET': last,
  },
  '/id/:par': {
    'GET': last,
  },
  '/lol': {
    'use': {
      'lol': middle
    },
    'GET': last,
    'POST': {
      'use': {
        'cors': (req, res) => _express(req, res, cors),
        'lol1': middle,
        'lol2': middle,
      },
      'handler': last
    },
  }
};

const { router } = new Lieve({
  '/': {
    'use': {
      // 'cors': (req, res) => _express(req, res, cors),
    },
    'GET': (req, res) => {
      // const { params } = req;
      // const [user, lol] = params;
      res.send(JSON.stringify({ hello: 'world' }), 'application/json');
    },
  },
  '/users': lol
});

const server = http.createServer();

server.on('request', router);

server.listen(4003);

