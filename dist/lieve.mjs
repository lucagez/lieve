import{METHODS as t}from"http";var e=function(t){return t.replace(/\//g,"")};function r(t){return function(e){if("function"!=typeof e)throw new TypeError("Middleware must be of type function");this[t]=this[t].concat([e])}}var n={queryDelimiter:"?",notFound:{message:"Not Found",type:"text/plain"}};export default function(i){var s=this;if(void 0===i&&(i={}),i&&"object"!=typeof i)throw new TypeError("Config must be of type object");this.routes=new Map,this.asRegistered=[],this.middlewares=[],this.errMiddlewares=[],this.lookup=null,this.find=null,function(t){var e=this;Object.keys(n).forEach(function(r){e[r]=t[r]||n[r]})}.bind(this)(i),t.forEach(function(t){s[t]=function(t){return function(r,n,i){var s;if("string"!=typeof r)throw new TypeError("Endpoint must be a string");if("function"!=typeof i)throw new TypeError("Handler must be a function");if(!Array.isArray(n))throw new TypeError("Middlewares must be an array");if(n.length>0&&n.filter(function(t){return"function"!=typeof t}).length>0)throw new TypeError("Every middleware should be a function");var o=e(r);this.asRegistered.push(r);var a=this.routes.get(o)||{};this.routes.set(o,Object.assign({},a,((s={})[t]=n.concat([i]),s)))}}(t).bind(s)}),this.printr=function(){var r=this;return{absolute:this.asRegistered.sort(),byPath:this.asRegistered.reduce(function(t,n){var i;return Object.assign({},t,((i={})[n]=Object.keys(r.routes.get(e(n))),i))},{}),byMethod:t.map(function(t){return{method:t,paths:r.asRegistered.map(function(n){return(r.routes.get(e(n))||{})[t]&&n}).filter(Boolean)}}).filter(function(t){return t.paths.length>0}).reduce(function(t,e){var r;return Object.assign({},t,((r={})[e.method]=e.paths,r))},{})}}.bind(this),this.redirect=function(t,r){var n=new Map,i=r.routes,s=r.asRegistered,o=r.middlewares,a=r.errMiddlewares,u=e(t);i.forEach(function(t,e){return n.set(""+u+e,t)}),this.routes=new Map(Array.from(this.routes).concat(Array.from(n))),this.asRegistered=this.asRegistered.concat(s.map(function(t){return""+u+t})),this.middlewares=this.middlewares.concat(o),this.errMiddlewares=this.errMiddlewares.concat(a)}.bind(this),this.use=r("middlewares").bind(this),this.err=r("errMiddlewares").bind(this),this.start=function(){var t,e,r,n=this;return this.lookup=this.asRegistered.map(function(t){return t.split("/")}).flat().concat([""]).reduce(function(t,e){var r;return Object.assign({},t,((r={})[e]=0,r))},{}),this.find=(t=this.lookup,e=this.queryDelimiter,r=new RegExp("\\"+e+"(.*)"),function(n){var i,s="",o=[],a=n.split("/");if(n.indexOf(e)>-1){var u=a.length-1;a[u]=a[u].replace(r,function(t){return i=t.substr(1),""})}for(var c=a.length,f=0;f<c;f++){var h=a[f];void 0!==t[h]?s+=h:(o.push(h),s+=":par")}return{path:s,params:o,query:i}}),this.routes.forEach(function(t,e){var r={};Object.keys(t).forEach(function(e){r[e]=n.middlewares.concat(t[e])}),n.routes.set(e,r)}),function(t,e){var r=t.method,i=n.find(t.url),s=i.params,o=i.query,a=(n.routes.get(i.path)||{})[r];if("object"!=typeof a)return function(t,e){var r=e.message;t.writeHead(404,{"Content-Type":e.type}),t.end(r)}(e,n.notFound);t.params=s,t.query=o,function(t,e,r,n){var i=t,s=0;return function t(o){var a=[r,n,t];void 0!==o&&(i=e,s=0,a=[o,r,n,t]);var u=i[s++];if(u)return u.apply(void 0,a)}}(a,n.errMiddlewares,t,e)()}}.bind(this)}
