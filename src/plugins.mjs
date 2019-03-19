function _body(req, type) {
  return new Promise(resolve => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk))
    req.on('end', () => {
      const body = Buffer.concat(chunks).toString();
      switch (type) {
        case 'x-www-form-urlencoded':
          const parsed = {};
          body.split('&').map(e => {
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
};

function _cookie(req) {
  const { cookie } = req.headers;
  if (!cookie) return {};
  const basket = {};
  cookie.split(';').forEach(e => {
    const [prop, value] = e.split('=').map(e => e.trim());
    basket[prop] = value;
  });
  return basket;
}

export {
  _body,
  _cookie,
};
