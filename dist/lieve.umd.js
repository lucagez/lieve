!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.lieve={})}(this,function(t){function e(t,e,n){void 0===e&&(e="text/plain"),void 0===n&&(n=200),this.writeHead(n,{"Content-Type":e}),this.end(t,!1,!1)}function n(t){if(t)throw new Error(t);return 0}var r=function(t){return Object.keys(t).map(function(e){return t[e]})};function i(t){var e={};return Object.keys(t).forEach(function(n){if("use"!==n&&"extend"!==n){var i=t.extend,a=i?i+n.replace(/\/$/,""):n;e[a]={};var o=t[n];Object.keys(o).forEach(function(n){if("use"!==n){var i=t.after||{},u=o.use||{},s=o.after||{},c=r(t.use||{}),f=r(i),h=r(u),p=r(s),d=o[n],v="function"==typeof d?d:(m=d.handler,y=d.after||{},b=r(d.use||{}),x=r(y),b.concat(m,x)),l=c.concat(h,[v],p,f).flat();e[a][n]=l}var m,y,b,x})}}),e}t.Lieve=function(t){this.routes=t,this.queues=function(t){var e={},n={};Object.keys(t).forEach(function(r){t[r].hasOwnProperty("extend")?e[r]=t[r]:n[r]=t[r]});var r={};return Object.keys(e).forEach(function(t){r=Object.assign({},r,i(e[t]))}),Object.assign({},r,i(n))}(t),this.list=function(t){var e=Object.keys(t).map(function(t){return t.split("/").slice(1)}).flat().filter(function(t){return":par"!==t});return Array.from(new Set(e))}(t),this.matchUrl=new RegExp(/\/$|\?(.*)/),this.matchParams=new RegExp(/(?<=\/)\d+/g),this.find=function(t){var e=[];return"/"===t?{path:t,params:e}:{path:t.replace(this.matchUrl,"").replace(this.matchParams,function(t){return e.push(t),":par"}),params:e}}.bind(this),this.router=function(t,n){var r=t.method,i=this.find(t.url),a=i.path,o=i.params;n.send=e;var u=this.queues[a];if((u||{}).hasOwnProperty(r)){var s=u[r];t.params=o,t.queue=s,t.index=0,t.next=function(t,e){return this.index+=1,this.queue[this.index](t,e)}.bind(t),s[0](t,n)}else n.send(JSON.stringify({error:"Not Found",status:404}),"application/json",404)}.bind(this)},t._body=function(t,e){return new Promise(function(n){var r=[];t.on("data",function(t){return r.push(t)}),t.on("end",function(){var t=Buffer.concat(r).toString();switch(e){case"x-www-form-urlencoded":var i={};t.split("&").forEach(function(t){var e=t.split("=");i[e[0]]=e[1]}),n(i);break;case"binary":n({file:t});break;default:n(t)}})})},t._cookie=function(t){var e=t.headers.cookie;if(!e)return{};var n={};return e.split(";").forEach(function(t){var e=t.split("=").map(function(t){return t.trim()});n[e[0]]=e[1]}),n},t._query=function(t,e){void 0===e&&(e="&");var n={};return t.url.match(/[^?]+$/)[0].split(e).forEach(function(t){var e=t.split("=");n[e[0]]=e[1]}),n},t._set=function(t,e,n,r){void 0===r&&(r=!1),Object.defineProperty(t,e,{value:n,writable:r})},t._express=function(t,e,r,i){void 0===i&&(i=[]);var a=t.next;r.apply(void 0,i)(t,e,n),a(t,e)}});
//# sourceMappingURL=lieve.umd.js.map
