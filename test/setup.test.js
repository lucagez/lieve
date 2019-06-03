const { expect } = require('chai');
const { METHODS } = require('http');
const Lieve = require('../dist/lieve');

describe('Ensures that lieve setup is correct', () => {
  let router;

  // INstancing a clean router before each test
  before(() => {
    router = new Lieve();
  });

  /**
   * PUBLIC things
   */
  it('Should NOT throw when initializing without config', () => {
    const r = () => new Lieve();

    expect(r).to.not.throw();
  });

  it('Should throw when initializing with config being not an object', () => {
    const r = () => new Lieve(1);

    expect(r).to.throw();
  });

  it('router should have use method', () => {
    expect(router.use).to.be.a('function');
  });

  it('router should have err method', () => {
    expect(router.err).to.be.a('function');
  });

  it('router should have use method', () => {
    expect(router.use).to.be.a('function');
  });

  it('router should have start method', () => {
    expect(router.start).to.be.a('function');
  });

  it('router should have redirect method', () => {
    expect(router.redirect).to.be.a('function');
  });

  it('router should have EVERY http method', () => {
    METHODS
      .map(e => router[e])
      .forEach(fn => expect(fn).to.be.a('function'));
  });

  /**
   * INTERNAL things.
   * Checking initial values.
   */
  it('this.routes should be an empty Map', () => {
    expect(router.routes.size).to.be.equal(0);
  });

  it('this.asRegistered should be an empty array', () => {
    expect(router.asRegistered).to.be.an('array');
    expect(router.asRegistered.length).to.be.equal(0);
  });

  it('this.middlewares should be an empty array', () => {
    expect(router.middlewares).to.be.an('array');
    expect(router.middlewares.length).to.be.equal(0);
  });

  it('this.errMiddlewares should be an empty array', () => {
    expect(router.errMiddlewares).to.be.an('array');
    expect(router.errMiddlewares.length).to.be.equal(0);
  });

  it('this.lookup should be a NULL', () => {
    expect(router.lookup).to.be.null;
  });

  it('this.find should be a NULL', () => {
    expect(router.find).to.be.null;
  });

  /**
   * Dependand from config object
   */

  it('Default delimiter should be ?', () => {
    expect(router.queryDelimiter).to.be.equal('?');
  });

  it('Default not found should be `Not Found`', () => {
    expect(router.notFound.message).to.be.equal('Not Found');
  });

  it('Sets custom delimiter', () => {
    const cRouter = new Lieve({
      queryDelimiter: ';',
    });

    expect(cRouter.queryDelimiter).to.be.equal(';');
  });

  it('Sets custom error message', () => {
    const cRouter = new Lieve({
      notFound: {
        message: 'custom',
        type: 'text/plain',
      },
    });

    expect(cRouter.notFound.message).to.be.equal('custom');
    expect(cRouter.notFound.type).to.be.equal('text/plain');
  });
});
