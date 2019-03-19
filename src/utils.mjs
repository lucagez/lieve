const list = (routes) => {
  const pieces = Object.keys(routes)
    .map(e => e.split('/').slice(1))
    .flat()
    .filter(e => e !== ':par');

  return Array.from(new Set(pieces));
};

export { list };
