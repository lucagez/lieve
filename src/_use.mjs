
// Reusing the same function both for middlewares and error middlewares
function use(type) {
  // Adding the provided function at the end of the registered middleware queue.
  // => preserve the registration order.
  return function useScoped(func) {
    if (typeof func !== 'function') throw new TypeError('Middleware must be of type function');
    this[type] = [
      ...this[type],
      func,
    ];
  };
}

export default use;
