const http = require('http');

const { Lieve, _express } = require('../dist/lieve');

const topLevelMiddleware = (req, res) => {
  const { next } = req;
  console.log('working at top level');
  next(req, res);
};

const underTopLevelMiddleware = (req, res) => {
  const { next } = req;
  console.log('working under top level');
  next(req, res);
};

const middle = (req, res) => {
  const { next } = req;
  console.log('middle');
  // throw new Error('middle');
  next(req, res);
};

const last = (req, res) => {
  const { params, next } = req;
  console.log(params);
  res.send(JSON.stringify({ hello: 'world' }), 'application/json');
  next(req, res);
};

const presaB = () => {
  console.log('presa bbbbbbb');
};

const lol = {
  'extend': '/users',
  'use': {
    'under-top =>': underTopLevelMiddleware,
  },
  '/': {
    'GET': last,
  },
  '/id': {
    'GET': last,
  },
  '/id/:par': {
    'GET': last,
  },
  '/lol': {
    'use': {
      'lol': middle
    },
    'GET': last,
    'POST': {
      'use': {
        // 'cors': (req, res) => _express(req, res, cors),
        'lol1': middle,
        'lol2': middle,
      },
      'after': {
        'last': middle,
      },
      'handler': last
    },
  }
};

const lollo = {
  'extend': '/walla',
  '/': {
    'GET': last,
  },
  '/id': {
    'GET': last,
  },
  '/id/:par': {
    'GET': last,
  },
  '/lol': {
    'use': {
      'lol': middle
    },
    'GET': last,
    'POST': {
      'use': {
        // 'cors': (req, res) => _express(req, res, cors),
        'lol1': middle,
        'lol2': middle,
      },
      'handler': middle,
      'after': {
        'presa': presaB,
      }
    },
  }
};

const { router } = new Lieve({
  'after': {
    'top-level =>': topLevelMiddleware,
  },
  '/': {
    'use': {
      // 'cors': (req, res) => _express(req, res, cors),
    },
    'after': {
      'presab': presaB,
    },
    'GET': (req, res) => {
      const { params, next } = req;
      console.log(params);
      // const [user, lol] = params;
      res.send(JSON.stringify({ hello: 'world' }), 'application/json');
      next(req);
    },
  },
  '/users': lol,
  '/walla': lollo,
});

const server = http.createServer();

server.on('request', router);

server.listen(4003);

