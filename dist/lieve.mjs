var t=function(t,n){return new Promise(function(e){var r=[];t.on("data",function(t){return r.push(t)}),t.on("end",function(){var t=Buffer.concat(r).toString();switch(n){case"x-www-form-urlencoded":var i={};t.split("&").map(function(t){var n=t.split("=");i[n[0]]=n[1]}),e(i);break;case"binary":e({file:t});break;default:e(t)}})})},n=function(t){var n=t.headers.cookie;if(!n)return{};var e={};return n.split(";").forEach(function(t){var n=t.split("=").map(function(t){return t.trim()});e[n[0]]=n[1]}),e},e=function(t,n){void 0===n&&(n="&");var e={};return t.url.match(/[^?]+$/)[0].split(n).map(function(t){var n=t.split("=");e[n[0]]=n[1]}),e},r=function(t,n,e,r){void 0===r&&(r=!1),Object.defineProperty(t,n,{value:e,writable:r})};function i(t,n,e){void 0===n&&(n="text/plain"),void 0===e&&(e=200),this.writeHead(e,{"Content-Type":n}),this.end(t,!1,!1)}function a(t){if(t)throw new Error(t)}function u(t,n,e,r){void 0===r&&(r=[]);var i=t.next;e.apply(void 0,r)(t,n,a),i(t,n)}var o=function(t){return Object.keys(t).map(function(n){return t[n]})},s=function(t){var n={};return Object.keys(t).forEach(function(e){if("use"!==e&&"extend"!==e){var r=t.extend,i=r?r+e.replace(/\/$/,""):e;n[i]={};var a=t[e];Object.keys(a).forEach(function(e){if("use"!==e){var r=t.after||{},u=a.use||{},s=a.after||{},c=o(t.use||{}),f=o(r),h=o(u),p=o(s),d=a[e],l="function"==typeof d?d:function(){var t=d.handler,n=d.after||{},e=o(d.use||{}),r=o(n);return e.concat(t,r)}(),v=c.concat(h,[l],p,f).flat();n[i][e]=v}})}}),n},c=function(t){this.routes=t,this.queues=function(t){var n={},e={};Object.keys(t).forEach(function(r){t[r].hasOwnProperty("extend")?n[r]=t[r]:e[r]=t[r]});var r={};return Object.keys(n).forEach(function(t){r=Object.assign({},r,s(n[t]))}),Object.assign({},r,s(e))}(t),this.list=function(t){var n=Object.keys(t).map(function(t){return t.split("/").slice(1)}).flat().filter(function(t){return":par"!==t});return Array.from(new Set(n))}(t),console.log(this.queues),this.matchUrl=new RegExp(/\/$|\?(.*)/),this.matchParams=new RegExp(/(?<=\/)\d+/g),this.find=function(t){var n=[];return"/"===t?{path:t,params:n}:{path:t.replace(this.matchUrl,"").replace(this.matchParams,function(t){return n.push(t),":par"}),params:n}}.bind(this),this.router=function(t,n){var e=t.method,r=this.find(t.url),a=r.path,u=r.params;n.send=i;var o=this.queues[a];if((o||{}).hasOwnProperty(e)){var s=o[e];t.params=u,t.queue=s,t.index=0,t.next=function(t,n){return this.index+=1,this.queue[this.index](t,n)}.bind(t),s[0](t,n)}else n.send(JSON.stringify({error:"Not Found",status:404}),"application/json",404)}.bind(this)};export{c as Lieve,t as _body,n as _cookie,e as _query,r as _set,u as _express};
//# sourceMappingURL=lieve.mjs.map
