const toArr = obj => Object.keys(obj).map(e => obj[e]);

export default function _queues(routes) {
  const queues = {};
  Object.keys(routes).forEach(endpoint => {
    if (endpoint !== 'use') {
      queues[endpoint] = {};

      Object.keys(routes[endpoint]).forEach(method => {
        if (method !== 'use') {
          const useAll = routes.use || {};
          const useRoute = routes[endpoint].use || {};
          const arrUseAll = toArr(useAll);
          const arrUseRoute = toArr(useRoute);

          const current = routes[endpoint][method];
          const handler = typeof current === 'function'
            ? current
            : (() => {
              const { handler } = current;
              const useHandler = current.use || {};
              const arrUseHandler = toArr(useHandler);
              return [...arrUseHandler, ...handler];
            })();

          const queue = [...arrUseAll, ...arrUseRoute, handler].flat();
          queues[endpoint][method] = queue;
        }
      });
    }
  });

  return queues;
};
