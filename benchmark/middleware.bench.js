/**
 * Testing the overhead caused by the presence of a longer req queue.
 */

const autocannon = require('autocannon');
const http = require('http');
const Lieve = require('../src/lieve');

const { log } = console;

const router = new Lieve();

const testMiddleware = (req, res, next) => next();
const testQueue = [
  testMiddleware,
  testMiddleware,
  testMiddleware,
  testMiddleware,
  testMiddleware,
];

router.use(testMiddleware);

router.GET('/', testQueue, (req, res) => res.end());
router.GET('/:par', testQueue, (req, res) => res.end());
router.GET('/medium/route', testQueue, (req, res) => res.end());
router.GET('/medium/:par', testQueue, (req, res) => res.end());
router.GET('/this/is/a/longer/test/route', testQueue, (req, res) => res.end());
router.GET('/this/:par/a/longer/:par/route', testQueue, (req, res) => res.end());

const server = http.createServer(router.start());

const config = url => ({
  url: `http://localhost:3000${url}`,
  connections: 50,
  pipelining: 10,
  duration: 10,
});

server.listen(3000, async () => {
  // Avoid overloading the server with multiple concurrent tests
  log('MIDLLEWARE BENCHMARK');

  const result = {
    'basic route': await autocannon(config('/')),
    'basic route with param': await autocannon(config('/1234')),
    'medium route': await autocannon(config('/medium/route')),
    'medium route with param': await autocannon(config('/medium/1234')),
    'long route': await autocannon(config('/this/is/a/longer/test/route')),
    'long route with param': await autocannon(config('/this/1234/a/longer/1234/route')),
  };

  Object.keys(result).forEach((r) => {
    log(`${r}: ${result[r].requests.average} req/s`);
  });

  log('\n');

  process.exit(0);
});
