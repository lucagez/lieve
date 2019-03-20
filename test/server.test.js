const http = require('http');
const fs = require('fs');
// const { Lieve } = require('../src/lieve.mjs');
const { Lieve, _body, _cookie } = require('../dist/lieve');

// const middle = (req, res) => {
//   const { next, queue, index } = req;
//   // console.log('ciao');

//   next(req, res);

//   // console.log(req.index);
// };

const { router } = new Lieve({
  '/users': {
    'GET': ( req, res ) => {
      const { header, setHeader } = res;
      
      // fs.writeFileSync('./res_pure.json', JSON.stringify(res));
      console.log('\n######################\n');
      console.log('\n######################\n');
      console.log('\n######################\n');
      console.log('\n######################\n');
      console.log('\n######################\n');

      console.log(res);

      res.setHeader('Content-Type', 'application/json; wsalllakattmagggllli');

      console.log('\n######################\n');
      console.log('\n######################\n');
      console.log('\n######################\n');
      console.log('\n######################\n');
      console.log('\n######################\n');

      console.log(res);
      // fs.writeFileSync('./res_head.json', JSON.stringify(res));

      // res.send({
      //   type: 'application/json',
      //   content: JSON.stringify({ hello: 'world' }),
      // });
      // res.setHeader('Content-Type', 'application/json');
      // res.end(JSON.stringify({ hello: 'world' }));
    },
  },
});

const server = http.createServer();

server.on('request', router);

server.listen(4003);
