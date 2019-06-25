// This function will invoke
// in a `connect` like fashion, the next function in the queue
// passing by reference the req/res objects and the scoped `nextScoped` function.
const next = (queue, errQueue, req, res) => {
  let usedQueue = queue;
  let current = 0;
  let args = [req, res];

  return function nextScoped(err) {
    // Defining args as an array => when an error is passed to
    // next func the array is updated as the error middlewares supports
    // a different arguments order.
    // This is necessary to keep Express/Connect compatibility

    if (typeof err !== 'undefined') {
      usedQueue = errQueue;
      current = 0;
      args = [err, req, res];
    }

    const nextFunc = usedQueue[current++];

    if (typeof nextFunc !== 'undefined') {
      return nextFunc(...args, nextScoped);
    }
  };
};


module.exports = next;
