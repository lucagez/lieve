const http = require('http');
const fs = require('fs');
// const { Lieve } = require('../src/lieve.mjs');
const { Lieve } = require('../dist/lieve');

// const func = (req, res) => {
//   const { next } = req;
//   console.log('ciao');


//   next()(req, res);

//   // console.log(req.index);
// };

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
      res.send(JSON.stringify({ hello: 'world' }), 'application/json');
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
