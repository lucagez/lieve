const toArr = obj => Object.keys(obj).map(e => obj[e]);

const _single = obj => {
  const queues = {};
  Object.keys(obj).forEach(endpoint => {
    if (endpoint !== 'use' && endpoint !== 'extend') {
      const { extend } = obj;
      const usedEndpoint = extend ? extend + endpoint.replace(/\/$/, '') : endpoint;

      queues[usedEndpoint] = {};

      const route = obj[endpoint];
      Object.keys(route).forEach(method => {
        if (method !== 'use') {
          const useAll = obj.use || {};
          const afterAll = obj.after || {};
          const useRoute = route.use || {};
          const afterRoute = route.after || {};
          const arrUseAll = toArr(useAll);
          const arrAfterAll = toArr(afterAll);
          const arrUseRoute = toArr(useRoute);
          const arrAfterRoute = toArr(afterRoute);

          const current = route[method];
          const handler = typeof current === 'function'
            ? current
            : (() => {
              const { handler } = current;
              const useHandler = current.use || {};
              const afterHandler = current.after || {};

              const arrUseHandler = toArr(useHandler);
              const arrAfterHandler = toArr(afterHandler);
              return [...arrUseHandler, ...handler, ...arrAfterHandler];
            })();

          const queue = [...arrUseAll, ...arrUseRoute, handler, ...arrAfterRoute, ...arrAfterAll].flat();
          queues[usedEndpoint][method] = queue;
        }
      });
    }
  });

  return queues;
}

export default function _queues(routes) {
  const extended = {};
  const filtered = {};
  Object.keys(routes).forEach(e => {
    if (routes[e].hasOwnProperty('extend')) {
      extended[e] = routes[e];
    } else {
      filtered[e] = routes[e];
    }
  });

  let merged = {};
  Object.keys(extended).forEach(e => {
    merged = {
      ...merged,
      ..._single(extended[e]),
    };
  });

  return {
    ...merged,
    ..._single(filtered),
  };
};

