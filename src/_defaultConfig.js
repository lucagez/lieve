const defaultConfig = {
  queryDelimiter: '?',
  notFound: {
    message: 'Not Found',
    type: 'text/plain; charset=utf-8',
  },
};

function buildDefaultConfig(config) {
  Object.keys(defaultConfig).forEach((e) => {
    this[e] = config[e] || defaultConfig[e];
  });
}

module.exports = buildDefaultConfig;
