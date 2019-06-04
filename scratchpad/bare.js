const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.end('hello');
});

server.listen(3000, () => console.log('listening'));
