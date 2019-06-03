const { expect } = require('chai');
const esm = require('esm')({});

const { default: _next } = esm(`${__dirname}/../src/_next`);

const queue = [
  () => 'first',
  () => 'second',
  () => 'third',
];

const returnRR = [
  (req, res) => ({ req, res }),
];

const returnNext = [
  (req, res, next) => next,
];

describe('Next middleware behavior', () => {
  it('Should return a function when initialized', () => {
    const next = _next([], [], 1, 2);
    expect(next).to.be.a('function');
  });

  it('Should invoke the first function in the queue', () => {
    const next = _next(queue, [], 1, 2);
    const first = next();
    expect(first).to.be.equal('first');
  });

  it('Should invoke the first function in the queue', () => {
    const next = _next(queue, [], 1, 2);
    const first = next();
    expect(first).to.be.equal('first');
  });

  it('Should invoke subsequently each function in the queue', () => {
    const next = _next(queue, [], 1, 2);
    expect(next()).to.be.equal('first');
    expect(next()).to.be.equal('second');
    expect(next()).to.be.equal('third');
  });

  it('Should return undefined when queue ends', () => {
    const next = _next(queue, [], 1, 2);
    expect(next()).to.be.equal('first');
    expect(next()).to.be.equal('second');
    expect(next()).to.be.equal('third');
    expect(next()).to.be.undefined;
  });

  it('Should invoke the function with req/res arguments', () => {
    const next = _next(returnRR, [], 1, 2);
    const RR = next();
    expect(RR.req).to.be.equal(1);
    expect(RR.res).to.be.equal(2);
  });

  it('Should invoke the function in the queue providing itself as arg', () => {
    const next = _next(returnNext, [], 1, 2);
    const N = next();
    expect(N).to.be.a('function');
  });
});
