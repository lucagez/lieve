const { expect } = require('chai');
const Lieve = require('../dist/lieve');

describe('Router redirects another router instance', () => {
  const router = new Lieve();
  router.use((req, res, next) => next());
  router.err((err, req, res, next) => next());
  router.GET('/', [], (req, res) => res.end());
  router.GET('/route', [], (req, res) => res.end());

  const newRouter = new Lieve();
  newRouter.redirect('/test', router);

  it('Should inherit routes', () => {
    expect(newRouter.routes.size).to.be.above(0);
  });

  it('Should inherit asRegistered routes', () => {
    expect(newRouter.asRegistered.length).to.be.above(0);
  });

  it('Should inherit middlewares', () => {
    expect(newRouter.middlewares.length).to.be.above(0);
  });

  it('Should inherit error middlewares', () => {
    expect(newRouter.errMiddlewares.length).to.be.above(0);
  });

  it('Should prefix routes', () => {
    expect(newRouter.routes.has('testroute')).to.be.true;
    expect(newRouter.routes.get('testroute').GET[0]).to.be.a('function');
  });
});
