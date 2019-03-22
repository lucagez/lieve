import { _send, _next } from './utils';

export default function router(req, res) {
  const { url, method } = req;
  const { path, params } = this.find(url);

  res.send = _send;

  const endpoint = this.queues[path];
  if ((endpoint || {}).hasOwnProperty(method)) {
    const queue = endpoint[method];
    req.params = params;
    req.queue = queue;
    req.index = 0;
    req.next = _next.bind(req);

    queue[0](req, res);
  } else {
    res.send(JSON.stringify({
      error: 'Not Found',
      status: 404,
    }), 'application/json', 404);
  }
}
