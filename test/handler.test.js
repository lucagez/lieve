const { expect } = require('chai');
const shot = require('@hapi/shot');
const Lieve = require('../src/lieve');

describe('Handler tests', () => {
  const router = new Lieve();
  router.GET('/a', [], (req, res) => res.end('A'));
  router.GET('/b', [], (req, res) => res.end('B'));

  router.GET('/', [], (req, res) => res.end('basic'));
  router.GET('/this/is/more/complex', [], (req, res) => res.end('complex'));

  router.GET('/this/:par/more/complex', [], (req, res) => res.end(req.params[0]));
  router.GET('/query', [], (req, res) => res.end(req.query));

  router.GET('/withmiddle', [(req, res) => res.end('middle hit!')], (req, res) => res.end());

  const handler = router.start();

  it('Should be a function', () => {
    expect(handler).to.be.a('function');
  });

  it('Should redirect to different handlers based on req.url', async () => {
    const { payload: A } = await shot.inject(handler, { method: 'get', url: '/a' });
    const { payload: B } = await shot.inject(handler, { method: 'get', url: '/b' });

    expect(A).to.be.equal('A');
    expect(B).to.be.equal('B');
  });

  it('Should redirect the basic path', async () => {
    const { payload: basic } = await shot.inject(handler, { method: 'get', url: '/' });
    expect(basic).to.be.equal('basic');
  });

  it('Should redirect complex path', async () => {
    const { payload: complex } = await shot.inject(handler, { method: 'get', url: '/this/is/more/complex' });
    expect(complex).to.be.equal('complex');
  });

  it('Should make parameters available in request object', async () => {
    const { payload: parameter } = await shot.inject(handler, { method: 'get', url: '/this/d34f3/more/complex' });
    expect(parameter).to.be.equal('d34f3');
  });

  it('Should make query string available in request object', async () => {
    const { payload: query } = await shot.inject(handler, { method: 'get', url: '/query?ciao=42' });
    expect(query).to.be.equal('ciao=42');
  });

  it('Should return Not Found if non-existent route is hit', async () => {
    const { payload: notFound } = await shot.inject(handler, { method: 'get', url: '/not' });
    expect(notFound).to.be.equal('Not Found');
  });

  it('Should return 404 code if non-existent route is hit', async () => {
    const { payload: middle } = await shot.inject(handler, { method: 'get', url: '/withmiddle' });
    expect(middle).to.be.equal('middle hit!');
  });
});
