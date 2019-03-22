const http = require('http');


// ADD CORS DECORATOR =>
// cors modify res headers => then invoke Lieve          `next`
const cors = require('cors');
// const http = require('turbo-http');
// const http = require('mitol');
const fs = require('fs');
// const { Lieve } = require('../src/lieve.mjs');
const { Lieve } = require('../dist/lieve');

const func = (req, res) => {
  const { next } = req;
  console.log('ciao');

  // const stringify = fastJson({
  //   type: 'object',
  //   properties: {
  //     hello: {
  //       type: 'string'
  //     },
  //   },
  // });

  next(req, res);

  // console.log(req.index);
};

const last = (req, res) => {
  const { next } = req;
  console.log('last');
  next(req, res);
};

const megalast = (req, res) => {
  console.log('megalast');
  res.end('lol');
};

const msg = JSON.stringify({ hello: 'world' });

const { router } = new Lieve({
  'use': {
    handle: func,
  },
  '/users': {
    use: {
      handle: func,
    },
    'GET': (req, res) => {
      // const { params } = req;
      // const [user, lol] = params;
      res.send(JSON.stringify({ hello: 'world' }), 'application/json');
      // res.setHeader('Content-Type', 'application/json');
      // res.end(JSON.stringify({ hello: 'world' }));
    },
  },
  '/lol': {
    'use': {
      lol: func,
      handle: func,
    },
    'POST': megalast,
    'GET': {
      'use': {
        'skere': last,
      },
      handler: megalast,
    }
  }
  // '/users/:par': {
  //   'GET': (req, res) => res.end('hi (:'),
  //   'POST': (req, res) => res.end('hi (:'),
  //   'DELETE': (req, res) => res.end('hi (:'),
  // },
  // '/products': {
  //   'before': [
  //     func,
  //   ],
  //   'DELETE': () => '(:',
  // }
});

const server = http.createServer(router);

// server.on('request', router);

server.listen(4003);
