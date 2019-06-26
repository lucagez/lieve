const fastify = require('fastify')();
const bombarder = require('./_bombarder');

const { log } = console;


fastify.get('/', function (req, reply) {
  reply.res.end('hello');
});

fastify.listen(3000, async () => {
  const result = await bombarder(2);

  log(`fastify: ${result} req/s`);
  process.exit(0);
});
