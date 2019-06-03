import _find from './_find';
import next from './_next';
import { sendNotFound } from './_utils';

function start() {
  // Setting up lookup before initializing.
  // The lookup is made with all the existing pieces that are
  // found in the registered endpoints.
  // e.g. '/shop/products' => 'shop' 'products' => _find will build the url either
  // with one of the registered pieces or with :par.
  // NOTE: an empty string '' is added to the lookup object on purpose because, when splitting
  // a url string, the first item of the resulting array will always be an empty string.
  // Not including it will result in an unwanted :par added at the beginning
  // of the resulting string.
  this.lookup = new Set(
    [
      ...this.asRegistered
        .map(route => route.split('/'))
        .flat(),
      '',
    ],
  );

  this.find = _find(this.lookup, this.queryDelimiter);

  // Retrieving old queues and adding at the queues the global middlewares.
  // If avoiding this operation on every new `use` insertion,
  // when redirecting a path to a new router, every global middleware
  // defined after the redirection will be ignored.
  // NOTE: making the queue on every insertion is lightening the work that has to be done
  // on each incoming request.
  // => The queue will no longer be created on request. But a global queue for each endpoint
  // is created beforehand.
  this.routes.forEach((actual, route) => {
    const newQueue = {};
    Object.keys(actual).forEach((method) => {
      newQueue[method] = [
        ...this.middlewares,
        ...actual[method],
      ];
    });

    // Finally setting the new updated queue.
    this.routes.set(route, newQueue);
  });

  return (req, res) => {
    const { url, method } = req;
    const { path, params, query } = this.find(url);

    const endpoint = this.routes.get(path) || {};

    // composing the global middlewares with the middlewares defined
    // for just one endpoint
    const queue = endpoint[method];

    if (typeof queue !== 'undefined') return sendNotFound(res, this.notFound);

    req.params = params;
    req.query = query;

    // Creating the queue and the generator containing every middleware.
    // When starting the first function in the queue will be invoked.
    next(queue, this.errMiddlewares, req, res)();
  };
}

export default start;
