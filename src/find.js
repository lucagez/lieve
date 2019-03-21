export default function _find(url) {
  if (url === '/') return {
    path: url,
    par: undefined,
  };

  const use = url.replace(this.matchUrl, '');
  par = use.match(this.matchPar)[0];
  path = this.list.indexOf(par) > -1
    ? use
    : use.replace(par, ':par');

  return { path, par };
};

