function t(t,e,n){void 0===e&&(e="text/plain"),void 0===n&&(n=200),this.writeHead(n,{"Content-Type":e}),this.end(t,!1,!1)}function e(t){if(t)throw new Error(t)}var n=function(t){return Object.keys(t).map(function(e){return t[e]})},r=function(t){var e={};return Object.keys(t).forEach(function(r){if("use"!==r&&"extend"!==r){var i=t.extend,a=i?i+r.replace(/\/$/,""):r;e[a]={};var o=t[r];Object.keys(o).forEach(function(r){if("use"!==r){var i=t.after||{},s=o.use||{},u=o.after||{},c=n(t.use||{}),f=n(i),p=n(s),h=n(u),d=o[r],l="function"==typeof d?d:function(){var t=d.handler,e=d.after||{},r=n(d.use||{}),i=n(e);return r.concat(t,i)}(),v=c.concat(p,[l],h,f).flat();e[a][r]=v}})}}),e};exports.Lieve=function(e){this.routes=e,this.queues=function(t){var e={},n={};Object.keys(t).forEach(function(r){t[r].hasOwnProperty("extend")?e[r]=t[r]:n[r]=t[r]});var i={};return Object.keys(e).forEach(function(t){i=Object.assign({},i,r(e[t]))}),Object.assign({},i,r(n))}(e),this.list=function(t){var e=Object.keys(t).map(function(t){return t.split("/").slice(1)}).flat().filter(function(t){return":par"!==t});return Array.from(new Set(e))}(e),console.log(this.queues),this.matchUrl=new RegExp(/\/$|\?(.*)/),this.matchParams=new RegExp(/(?<=\/)\d+/g),this.find=function(t){var e=[];return"/"===t?{path:t,params:e}:{path:t.replace(this.matchUrl,"").replace(this.matchParams,function(t){return e.push(t),":par"}),params:e}}.bind(this),this.router=function(e,n){var r=e.method,i=this.find(e.url),a=i.path,o=i.params;n.send=t;var s=this.queues[a];if((s||{}).hasOwnProperty(r)){var u=s[r];e.params=o,e.queue=u,e.index=0,e.next=function(t,e){return this.index+=1,this.queue[this.index](t,e)}.bind(e),u[0](e,n)}else n.send(JSON.stringify({error:"Not Found",status:404}),"application/json",404)}.bind(this)},exports._body=function(t,e){return new Promise(function(n){var r=[];t.on("data",function(t){return r.push(t)}),t.on("end",function(){var t=Buffer.concat(r).toString();switch(e){case"x-www-form-urlencoded":var i={};t.split("&").map(function(t){var e=t.split("=");i[e[0]]=e[1]}),n(i);break;case"binary":n({file:t});break;default:n(t)}})})},exports._cookie=function(t){var e=t.headers.cookie;if(!e)return{};var n={};return e.split(";").forEach(function(t){var e=t.split("=").map(function(t){return t.trim()});n[e[0]]=e[1]}),n},exports._query=function(t,e){void 0===e&&(e="&");var n={};return t.url.match(/[^?]+$/)[0].split(e).map(function(t){var e=t.split("=");n[e[0]]=e[1]}),n},exports._set=function(t,e,n,r){void 0===r&&(r=!1),Object.defineProperty(t,e,{value:n,writable:r})},exports._express=function(t,n,r,i){void 0===i&&(i=[]);var a=t.next;r.apply(void 0,i)(t,n,e),a(t,n)};
//# sourceMappingURL=lieve.js.map
