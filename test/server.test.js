const http = require('http');
// const { Lieve } = require('../src/lieve');
const { Lieve, _body, _cookie } = require('../dist/lieve');

// const middle = (req, res) => {
//   const { next, queue, index } = req;
//   // console.log('ciao');

//   next(req, res);

//   // console.log(req.index);
// };

const { router } = new Lieve({
  '/users': {
    'GET': (req, res) => {
      // res.setHeader('Content-Type', 'application/json');
      // res.end(JSON.stringify({ hello: 'world' }));
      const { url } = req;
      console.log(url);
      res.send({
        type: 'application/json',
        content: JSON.stringify({ hello: 'world' }),
      });
    },
  },
});

const server = http.createServer();

server.on('request', router);

server.listen(4003);