function _send({ content, type = 'text/plain', status = 200 }) {
  this.statusCode = status;
  this.setHeader('Content-Type', type);
  this.end(content);
};

function _set(prop, val) {
  this[prop] = val;
};

function _next(req, res) {
  this.index += 1;
  this.queue[this.index](req, res);
};

const decor = (req, res) => {
  req.set = _set;
  req.next = _next.bind(req);
  res.send = _send;
};

export default decor;
