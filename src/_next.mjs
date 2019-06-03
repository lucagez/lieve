// This function will invoke
// in a `connect` like fashion, the next function in the queue
// passing by reference the req/res objects and the scoped `nextScoped` function.
const next = (queue, errQueue, req, res) => {
  let usedQueue = queue;
  let current = 0;
  return function nextScoped(err) {
    // Defining args as an array => when an error is passed to
    // next func the array is updated as the error middlewares supports
    // a different arguments order.
    // This is necessary to keep Express/Connect compatibility
    let args = [req, res, nextScoped];

    // pseudocode for err handling
    // if (err) => TODO: send to error handling middleware
    // flow: if err
    // => build err queue from err middlewares
    // => init counter to 0 again
    // => set `usedQueue` to errQueue
    // => continue flow as usual
    if (err) {
      usedQueue = errQueue;
      current = 0;

      // swap arg list
      args = [err, req, res, nextScoped];
    }

    const nextFunc = usedQueue[current++];
    if (nextFunc) return nextFunc(...args);
  };
};

export default next;
