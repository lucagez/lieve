const deSlash = str => str.replace(/\//g, '');

const sendNotFound = (res, messageObj) => {
  const { type, message } = messageObj;
  res.statusCode = 404;
  res.setHeader('Content-Type', type);
  res.end(message);
};

const arrayIsMadeOfFuncs = arr => arr
  .filter(e => typeof e !== 'function')
  .length > 0;

module.exports = {
  deSlash,
  sendNotFound,
  arrayIsMadeOfFuncs,
};
