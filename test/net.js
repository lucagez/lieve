const net = require('net')

const server = net.createServer((socket) => {
  socket.end('goodbye\n');
}).on('error', (err) => {
  // handle errors here
  // throw err;
});

// Grab an arbitrary unused port.
server.listen(4000);