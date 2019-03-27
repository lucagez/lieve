const http = require('http');
const { Lieve } = require('../dist/lieve');

const sleep = ms => new Promise(resolve => setTimeout(() => resolve(), ms));

const msleep = async (req, res) => {
  const { next } = req;
  await sleep(5000)
  console.log('msleep returned!');
  next(req, res);
};

const m = (req, res) => {
  const { next } = req;
  console.log('m returned!');
  next(req, res);
};

const { router } = new Lieve({
  '/sleep': {
    'use': {
      'sleep => ': msleep,
    },
    'GET': (req, res) => {
      res.send(JSON.stringify({ hello: 'world' }));
    },
  },
  '/without': {
    'use': {
      'without sleep => ': m,
    },
    'GET': (req, res) => {
      res.send(JSON.stringify({ hello: 'world' }));
    },
  },
});

const server = http.createServer(router);

server.listen(4003, () => console.log('listening on 4003'));

