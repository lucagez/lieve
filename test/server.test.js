const http = require('http');


// ADD CORS DECORATOR =>
// cors modify res headers => then invoke Lieve `next`
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

const last = () => '(:'
const msg = JSON.stringify({ hello: 'world' });

const { router } = new Lieve({
  // 'beforeAll': [
  //   func,
  //   func,
  //   func,
  //   func
  // ],
  '/': {
    // 'before': [
    //   func,
    // ],
    // 'after': [
    //   func,
    //   func,
    //   func,
    //   last
    // ],
    'GET': (req, res) => {
      res.send(JSON.stringify({ hello: 'world' }), 'application/json');
      // res.setHeader('Content-Type', 'application/json');
      // res.end(JSON.stringify({ hello: 'world' }));
    },
  },
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
