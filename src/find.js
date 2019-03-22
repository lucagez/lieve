export default function _find(url) {
  const params = [];
  if (url === '/') {
    return {
      path: url,
      params,
    };
  }

  const use = url.replace(this.matchUrl, '');
  const path = use.replace(this.matchParams, (param) => {
    params.push(param);
    return ':par';
  });

  return { path, params };
}
