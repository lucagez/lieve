const { expect } = require('chai');
const Lieve = require('../src/lieve');

/**
 * The fat that on return a lieve ethod for each http method
 * is already tested in `setup.test.js`.
 * In this file only GET will be used to test error handling behavior.
 */

describe('On, route definition', () => {
  const router = new Lieve();

  it('Should throw if `endpoint` is not a string', () => {
    const t = () => router.GET(1);
    expect(t).to.throw();
  });

  it('Should throw if `middlewares` is not an array', () => {
    const t = () => router.GET('/', 1, (req, res) => res.end());
    expect(t).to.throw();
  });

  it('Should throw if `middlewares` is not an array made of functions', () => {
    const t = () => router.GET('/', [1], (req, res) => res.end());
    expect(t).to.throw();
  });

  it('Should throw if `handler` is not a function', () => {
    const t = () => router.GET('/', [(req, res) => res.end()], 1);
    expect(t).to.throw();
  });

  it('Should define a key different than the provided endpoint', () => {
    router.GET('/', [], (req, res) => res.end());
    expect(router.routes.has('/')).to.be.false;
  });

  it('Should define a new endpoint', () => {
    router.GET('/', [], (req, res) => res.end());
    expect(router.routes.get('').GET[0]).to.be.a('function');
  });

  it('New methods belonging to the same endpoints are set in the same object', () => {
    router.POST('/', [], (req, res) => res.end());
    expect(router.routes.get('').POST[0]).to.be.a('function');
    expect(Object.keys(router.routes.get('')).length).to.be.equal(2);
  });

  it('Should define different endpoint under different key', () => {
    router.GET('/other', [], (req, res) => res.end());
    expect(router.routes.has('')).to.be.true;
    expect(router.routes.has('other')).to.be.true;
  });

  it('Should define middlewares specific for this route', () => {
    router.GET('/other1', [(req, res, next) => next()], (req, res) => res.end());
    expect(router.routes.get('other1').GET.length).to.be.equal(2);
  });
});
