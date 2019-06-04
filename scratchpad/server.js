const http = require('http');
// const helmet = require('helmet');
// const cors = require('cors');
// const Lieve = require('./src/lieve');
const Lieve = require('../dist/lieve');
// const url = require('url');
// console.log(Lieve);

const testMiddle = (req, res, next) => {
  console.log('skere');
  next();
}

const router = new Lieve();

// router.use((req, res, next) => {
//   console.log('liegi');
//   next('what!');
// });

router.err((err, req, res, next) => {
  console.log(err);
  next();
});

const headers = {
  'content-type': 'text/plain; charset=utf-8',
}

// router.use(cors());

router.GET('/pino/:par', [testMiddle], (req, res) => res.end('Hello'));
router.GET('/skere/pino/liegi/:par', [], async (req, res) => {
  // res.writeHead(200, headers);
  // const [lol] = req.params;
  // console.log(lol, req.query);
  // console.log(url.parse(req.url));
  res.end('hello', null, null);
});
router.GET('/', [], (req, res) => res.end('Hi'));

console.log(router.printr());

const server = http.createServer(router.start());
// const server = http.createServer((req, res) => res.end('hello'));

server.listen(3000, () => console.log('listening'));