const autocannon = require('autocannon');

const config = {
  url: 'http://localhost:3000',
  connections: 500,
  pipelining: 50,
  duration: 10,
};

// const bombarder = async () => ({
//   'basic route': await autocannon(config('?ciao=mondo')),
//   'basic route with param': await autocannon(config('/1234?ciao=mondo')),
//   'medium route': await autocannon(config('/medium/route?ciao=mondo')),
//   'medium route with param': await autocannon(config('/medium/1234?ciao=mondo')),
//   'long route': await autocannon(config('/this/is/a/longer/test/route?ciao=mondo')),
//   'long route with param': await autocannon(config('/this/1234/a/longer/1234/route?ciao=mondo')),
// });

const bombarder = async (n) => {
  let result = 0;
  for (let i = 0; i < n; ++i) {
    const temp = await autocannon(config);
    result = temp.requests.average;
  }
  return result;
};

module.exports = bombarder;
