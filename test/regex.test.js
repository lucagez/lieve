

const url1 = '/crazy/users/42/perfect';
const url2 = '/19860/products/42/perfect?lol=tru&sker=fal';
const url3 = '/products/';
const url4 = '/products/users/541';

// optimized router version => added support for qs at url parsing.
function _find1(url) {
  const params = [];

  // qs
  // const qs = [];

  const path = url.replace(/(?<=\/)\d+|\?.+|\/$/g, (param) => {
    // for qs support
    // if(param[0] === '?') {
    //   qs.push(param.substr(1));
    //   return '';
    // }

    if (param[0] === '?') return '';
    if (param[0] === '/') return '';
    params.push(param);
    return ':par';
  });

  return { path, params };
}

function _find2(url) {
  const params = [];

  const use = url.replace(/\?.+|\/$/, '');
  const path = use.replace(/(?<=\/)\d+/g, (param) => {
    params.push(param);
    return ':par';
  });

  return { path, params };
}

function _find3(url) {
  const params = [];

  const path = /\/crazy\/users\/42\/perfect/g.test(url);

  return { path, params };
}

function _find4(url) {
  const { length } = url;
  const params = [];
  let param = '';
  let path = '';

  let lock1 = false;
  let lock2 = false;

  let i = 0;
  for (; ;) {
    const charCurrent = url.charAt(i);
    const asciiCurrent = url.charCodeAt(i);
    const asciiNext = url.charCodeAt(i + 1);
    if (i === length || asciiCurrent === 63) break;
    if (asciiCurrent === 47 && asciiNext > 47 && asciiNext < 58) {
      lock1 = true;
      param += charCurrent;
      if (lock1 && !lock2) {
        lock2 = true;
        path += '/:par';
      }
    } else if (param !== '' && !lock1) {
      lock2 = false;
      params.push(param);
      param = '';
    }
    if (!lock1) path += charCurrent;
    lock1 = false;
    i += 1;
  }

  return path;
}

const complete = /(?<=\/)\d+|\?.+|\/$/g;
function _find5(url) {
  const params = [];

  // qs
  const qs = [];

  const path = url.replace(/(?<=\/)\d+|\?.+/g, (param) => {
    // for qs support
    if(param.charAt(0) === '?') {
       qs.push(param.substr(1));
       return '';
    }
    // if (param.charAt(0) === '/') return '';
    params.push(param);
    return ':par';
  });

  return { path, params, qs };
}

console.log(_find5(''));
