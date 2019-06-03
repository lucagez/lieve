const deSlash = str => str.replace(/\//g, '');

const sendNotFound = (res, messageObj) => {
  const { type, message } = messageObj;
  res.writeHead(404, {
    'Content-Type': type,
  });
  res.end(message);
};

const arrayIsMadeOfFuncs = arr => arr
  .filter(e => typeof e !== 'function')
  .length > 0;

export {
  deSlash,
  sendNotFound,
  arrayIsMadeOfFuncs,
};
