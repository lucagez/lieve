const autocannon = require('autocannon');

const config = {
  url: 'http://localhost:3000',
  connections: 50,
  pipelining: 10,
  duration: 20,
};

// const bombarder = async () => ({
//   'basic route': await autocannon(config('?ciao=mondo')),
//   'basic route with param': await autocannon(config('/1234?ciao=mondo')),
//   'medium route': await autocannon(config('/medium/route?ciao=mondo')),
//   'medium route with param': await autocannon(config('/medium/1234?ciao=mondo')),
//   'long route': await autocannon(config('/this/is/a/longer/test/route?ciao=mondo')),
//   'long route with param': await autocannon(config('/this/1234/a/longer/1234/route?ciao=mondo')),
// });

const bombarder = async () => {
  // WARMING
  await autocannon(config);

  // Result after warm up
  return autocannon(config);
};

module.exports = bombarder;
