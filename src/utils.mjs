function _body(type) {
  const ctx = this;

  return new Promise((resolve) => {
    const chunks = [];
    ctx.on('data', chunk => chunks.push(chunk));
    ctx.on('end', () => {
      const body = Buffer.concat(chunks).toString();
      switch (type) {
        case 'x-www-form-urlencoded':
          const parsed = {};
          body.split('&').forEach((e) => {
            const [prop, value] = e.split('=');
            parsed[prop] = value;
          });
          resolve(parsed);
          break;
        case 'binary':
          resolve({ file: body });
          break;
        default:
          resolve(body);
      }
    });
  });
}

function _turboBody(type) {
  const ctx = this;

  return new Promise((resolve) => {
    const parts = [];
    ctx.ondata = (buffer, start, length) => {
      const part = buffer.slice(start, length + start).toString();
      parts.push(part);
    };

    ctx.onend = () => {
      const body = parts.join('');
      switch (type) {
        case 'x-www-form-urlencoded':
          const parsed = {};
          body.split('&').forEach((e) => {
            const [prop, value] = e.split('=');
            parsed[prop] = value;
          });
          resolve(parsed);
          break;
        case 'binary':
          resolve({ file: body });
          break;
        default:
          resolve(body);
      }
    };
  });
}

function _cookie(req) {
  const { cookie } = req.headers;
  if (!cookie) return {};
  const basket = {};
  cookie.split(';').forEach((e) => {
    const [prop, value] = e.split('=').map(f => f.trim());
    basket[prop] = value;
  });
  return basket;
}

function _query(req, delimiter = '&') {
  const { url } = req;
  const query = {};
  url.match(/[^?]+$/)[0].split(delimiter).forEach((e) => {
    const [prop, value] = e.split('=');
    query[prop] = value;
  });
  return query;
}

function _set(req, prop, value) {
  if (req.hasOwnProperty(prop)) throw new Error('Trying to override req property');
  Object.defineProperty(req, prop, { value });
}

function _send(content, type = 'text/plain', status = 200) {
  // use this for `turbo-http`
  // this.statusCode = status;
  // this.setHeader('Content-Type', type);

  // use this for core `http`
  this.writeHead(status, {
    'Content-Type': type,
    // 'Content-Length': Buffer.from(content).length,
  });
  this.end(content, null, null);
}

// `turbo-http` send
function _turboSend(content, type = 'text/plain', status = 200) {
  this.statusCode = status;
  this.setHeader('Content-Type', type);
  this.end(content, null, null);
}

function _next() {
  const { req, res } = this;
  req.index += 1;
  const func = req.queue[req.index];
  if (func) func(req, res);
}

function _dummy(err) {
  if (err) throw new Error(err);
  return 0;
}

function _express(req, res, middleware, args = []) {
  const { next } = req;
  middleware(...args)(req, res, _dummy);
  next(req, res);
}

export {
  _body,
  _turboBody,
  _cookie,
  _query,
  _send,
  _turboSend,
  _set,
  _next,
  _express,
};
