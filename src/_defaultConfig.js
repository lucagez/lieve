const defaultConfig = {
  queryDelimiter: '?',
  notFound: {
    message: 'Not Found',
    type: 'text/plain',
  },
};

function buildDefaultConfig(config) {
  Object.keys(defaultConfig).forEach((e) => {
    this[e] = config[e] || defaultConfig[e];
  });
}

module.exports = buildDefaultConfig;
