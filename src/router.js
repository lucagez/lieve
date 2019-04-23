import {
  _send,
  _turboSend,
  _body,
  _turboBody,
  _next,
} from './utils';

export default function router(mode) {
  const useSend = mode === 'turbo' ? _turboSend : _send;
  const useBody = mode === 'turbo' ? _turboBody : _body;

  return function memo(req, res) {
    const { url, method } = req;
    const { path, params } = this.find(url);

    res.send = useSend;

    const endpoint = this.queues[path];
    if ((endpoint || {}).hasOwnProperty(method)) {
      const queue = endpoint[method];
      req.params = params;
      req.queue = queue;
      req.index = 0;
      req.next = _next.bind({ req, res });
      // req.body = useBody;

      queue[0](req, res);
    } else {
      res.send(JSON.stringify({
        error: 'Not Found',
        status: 404,
      }), 'application/json', 404);
    }
  };
}
