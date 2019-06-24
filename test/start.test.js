const { expect } = require('chai');
const Lieve = require('../src/lieve');

describe('Start initialize a router correctly', () => {
  const router = new Lieve();

  router.use((req, res, next) => next());
  router.GET('/this/is/a/test/route', [], (req, res) => res.end());
  const handler = router.start();

  it('Should define a lookup to be used in `find`', () => {
    expect(router.lookup).to.be.an('object');
    ['this', 'is', 'a', 'test', 'route']
      .forEach((piece) => {
        expect(router.lookup[piece]).to.be.equal(0);
      });
  });

  it('Should define an empty string for the first splitted slash', () => {
    expect(router.lookup['']).to.be.equal(0);
  });

  it('Find should now be an initialized function', () => {
    expect(router.find).to.be.a('function');
  });

  it('Should update routes merging global middlewares', () => {
    expect(router.routes.get('thisisatestroute').GET.length).to.be.equal(2);
  });

  it('Should return a function', () => {
    expect(handler).to.be.a('function');
  });
});
