const http = require('http');
const fs = require('fs');
// const { Lieve } = require('../src/lieve.mjs');
const { Lieve, _body, _cookie, _send, _queryParser } = require('../dist/lieve');

const func = (req, res) => {
  const { next } = req;
  console.log('ciao');


  next()(req, res);

  // console.log(req.index);
};

const { router } = new Lieve({
  '/users': {
    // 'before': [
    //   func,
    // ],
    // 'after': [
    //   func,
    // ],
    'GET': ( req, res ) => {
      // console.log('skere');
      res.send({
        type: 'application/json',
        content: JSON.stringify({ hello: 'world' }),
      });
      // res.setHeader('Content-Type', 'application/json');
      // res.end(JSON.stringify({ hello: 'world' }));
    },
  },
  // '/users/:par': {
  //   'GET': (req, res) => res.end('hi (:')
  // }
});

const server = http.createServer();

server.on('request', router);

server.listen(4003);
