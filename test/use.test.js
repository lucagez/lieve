const { expect } = require('chai');
const Lieve = require('../src/lieve');

describe('Use test: define both middlewares and errMiddlewares', () => {
  const router = new Lieve();

  router.use((req, res, next) => next());
  router.err((err, req, res, next) => next());

  it('Should define middlewares', () => {
    expect(router.middlewares.length).to.be.above(0);
  });

  it('Should define error middlewares', () => {
    expect(router.errMiddlewares.length).to.be.above(0);
  });

  it('Should merge newly defined middlewares', () => {
    router.use((req, res, next) => next());
    expect(router.middlewares.length).to.be.above(1);
  });

  it('Should merge newly defined error middlewares', () => {
    router.err((err, req, res, next) => next());
    expect(router.errMiddlewares.length).to.be.above(1);
  });
});
