export default function _queues(routes) {
  const queues = {};
  Object.keys(routes).forEach(endpoint => {
    if (endpoint !== 'beforeAll' && endpoint !== 'afterAll') {
      queues[endpoint] = {};

      Object.keys(routes[endpoint]).forEach(method => {
        if (method !== 'before' && method !== 'after') {
          const { beforeAll = [], afterAll = [] } = routes;
          const { before = [], after = [] } = routes[endpoint];
          const handler = routes[endpoint][method];
          const queue = [...beforeAll, ...before, handler, ...after, ...afterAll];

          queues[endpoint][method] = queue;
        }
      });
    }
  });

  return queues;
};
