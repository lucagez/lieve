const { expect } = require('chai');
const esm = require('esm')({});

const { default: _find } = esm(`${__dirname}/../src/_find`);

const testLookup = {
  'hello': 0,
  'operator': 0,
  'can': 0,
  'you': 0,
  'give': 0,
  'me': 0,
  'number': 0,
  '': 0,
};

const testUrl = '/hello/operator/2342rwqwc/can/343efew';
const urlWithQuery = 'hello/operator?number=324';
const basic = '/';

describe('Unit testing find module', () => {
  let find;
  before(() => {
    find = _find(testLookup, '?');
  });

  it('Should return a function when initialized', () => {
    const tFind = _find(testLookup, '?');
    expect(tFind).to.be.a('function');
  });

  it('Shoud return undefined query', () => {
    const { query } = find(testUrl);
    expect(query).to.be.undefined;
  });

  it('Shoud return a query string', () => {
    const { query } = find(urlWithQuery);
    expect(query).to.be.a('string');
  });

  it('Should return a path without slashes', () => {
    const { path } = find(testUrl);
    expect(path).to.be.a('string');
  });

  it('Should convert non-existent pieces in :par', () => {
    const { path } = find(testUrl);
    expect(path).to.be.equal('hellooperator:parcan:par');
  });

  it('Should convert basic into empty string', () => {
    const { path } = find(basic);
    expect(path).to.be.equal('');
  });

  it('Should return an array of params', () => {
    const { params } = find(testUrl);
    expect(params).to.be.an('array');
  });

  it('Should return params corresponding to the used url', () => {
    const { params } = find(testUrl);
    const [par1, par2] = params;

    expect(par1).to.be.equal('2342rwqwc');
    expect(par2).to.be.equal('343efew');
  });
});
