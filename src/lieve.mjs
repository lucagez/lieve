import router from './router';
import _queues from './queues';
import _find from './find';

export class Lieve {
  constructor(mode, routes) {
    this.routes = routes;
    this.queues = _queues(routes);

    this.matchUrl = new RegExp(/\/$|\?(.*)/);

    // Updated regex => avoid matching eg: `v1` as param.
    // Matches only numeric params. Both: `/xxx/` and `/xxx`
    this.matchParams = new RegExp(/(?<=\/)\d+/g);
    // this.matchParams = new RegExp(/[0-9]+[^\/]?/g);

    // Updated regex => match both `qs` and `params`
    // this.matcher = new RegExp(/(?<=\/)\d+|\?.+/g);

    this.find = _find.bind(this);
    this.router = router(mode).bind(this);
  }
}

export {
  _body,
  _cookie,
  _query,
  _set,
  _express,
} from './utils';
