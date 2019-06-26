const shot = require('@hapi/shot');
const { Suite } = require('benchmark');
const Lieve = require('../src/lieve');


const router = new Lieve();
router.GET('/', [], (req, res) => {
  res.setHeader('content-type', 'text/plain; charset=utf-8');
  res.end('hello');
});

const handler = router.start();

// const fire = handler => async () => shot.inject(handler, { method: 'get', url: '/' });

const suite = new Suite();


// Inline requests
suite
  .add('Lieve', {
    defer: true,
    fn: async (deferred) => {
      await shot.inject(handler, { method: 'get', url: '/' });
      deferred.resolve();
    }
  })
  .on('cycle', ({ target }) => console.log(String(target)))
  .run({ async: true });