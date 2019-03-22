import router from './router';
import _queues from './queues';
import _find from './find';
import { _list } from './utils';

export class Lieve {
  constructor(routes) {
    this.routes = routes;
    this.queues = _queues(routes);
    this.list = _list(routes);

    this.matchUrl = new RegExp(/\/$|\?(.*)/);
    this.matchParams = new RegExp(/[0-9]+[^\/]?/g);

    this.find = _find.bind(this);
    this.router = router.bind(this);
  };
};

export { _body, _cookie, _query, _set, _express } from './utils';

