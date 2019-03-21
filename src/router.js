import { _send, _next, _list } from './utils';

export default function router(req, res) {
  const { url, method } = req;
  const { path, par } = this.find(url);

  res['send'] = _send;
  
  const endpoint = this.queues[path];
  if ((endpoint || {}).hasOwnProperty(method)) {
    const queue = endpoint[method];
    req['par'] = par;
    req['queue'] = queue;
    req['index'] = 0;
    req['next'] = _next.bind(req);
    
    queue[0](req, res);
  } else {
    res.send(JSON.stringify({
      error: 'Not Found',
      status: 404,
    }), 'application/json', 404);
  };
};
