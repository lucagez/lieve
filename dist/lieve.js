function e(e){var t=this;return new Promise(function(r){var n=[];t.on("data",function(e){return n.push(e)}),t.on("end",function(){var t=Buffer.concat(n).toString();switch(e){case"x-www-form-urlencoded":var i={};t.split("&").forEach(function(e){var t=e.split("=");i[t[0]]=t[1]}),r(i);break;case"binary":r({file:t});break;default:r(t)}})})}function t(e){var t=this;return new Promise(function(r){var n=[];t.ondata=function(e,t,r){var i=e.slice(t,r+t).toString();n.push(i)},t.onend=function(){var t=n.join("");switch(e){case"x-www-form-urlencoded":var i={};t.split("&").forEach(function(e){var t=e.split("=");i[t[0]]=t[1]}),r(i);break;case"binary":r({file:t});break;default:r(t)}}})}function r(e,t,r){void 0===t&&(t="text/plain"),void 0===r&&(r=200),this.writeHead(r,{"Content-Type":t}),this.end(e,null,null)}function n(e,t,r){void 0===t&&(t="text/plain"),void 0===r&&(r=200),this.statusCode=r,this.setHeader("Content-Type",t),this.end(e,null,null)}function i(e){if(e)throw new Error(e);return 0}var a=function(e){return Object.keys(e).map(function(t){return e[t]})};function o(e){var t={};return Object.keys(e).forEach(function(r){if("use"!==r&&"extend"!==r){var n=e.extend,i=n?n+r.replace(/\/$/,""):r;t[i]={};var o=e[r];Object.keys(o).forEach(function(r){if("use"!==r){var n=e.use||{},s=e.after||{},u=o.use||{},c=o.after||{},f=e.afterTopLevel||{},h=a(e.useTopLevel||{}),p=a(f),v=a(n),d=a(s),l=a(u),b=a(c),w=o[r],x="function"==typeof w?w:(y=w.handler,O=w.after||{},E=a(w.use||{}),j=a(O),E.concat(y,j)),m=h.concat(v,l,[x],b,d,p).flat();t[i][r]=m}var y,O,E,j})}}),t}exports.Lieve=function(i,a){this.routes=a,this.queues=function(e){var t=e.use;void 0===t&&(t={});var r=e.after;void 0===r&&(r={});var n={},i={};Object.keys(e).forEach(function(a){e[a].hasOwnProperty("extend")?n[a]=Object.assign({},{useTopLevel:t,afterTopLevel:r},e[a]):i[a]=e[a]});var a={};return Object.keys(n).forEach(function(e){a=Object.assign({},a,o(n[e]))}),Object.assign({},a,o(i))}(a),this.matchUrl=new RegExp(/\/$|\?(.*)/),this.matchParams=new RegExp(/(?<=\/)\d+/g),this.find=function(e){var t=[];return"/"===e?{path:e,params:t}:{path:e.replace(this.matchUrl,"").replace(this.matchParams,function(e){return t.push(e),":par"}),params:t}}.bind(this),this.router=function(i){var a="turbo"===i?n:r,o="turbo"===i?t:e;return function(e,t){var r=e.method,n=this.find(e.url),i=n.path,s=n.params;t.send=a;var u=this.queues[i];if((u||{}).hasOwnProperty(r)){var c=u[r];e.params=s,e.queue=c,e.index=0,e.next=function(){var e=this.req,t=this.res;e.index+=1;var r=e.queue[e.index];r&&r(e,t)}.bind({req:e,res:t}),e.body=o,c[0](e,t)}else t.send(JSON.stringify({error:"Not Found",status:404}),"application/json",404)}}(i).bind(this)},exports._cookie=function(e){var t=e.headers.cookie;if(!t)return{};var r={};return t.split(";").forEach(function(e){var t=e.split("=").map(function(e){return e.trim()});r[t[0]]=t[1]}),r},exports._query=function(e,t){void 0===t&&(t="&");var r={};return e.url.match(/[^?]+$/)[0].split(t).forEach(function(e){var t=e.split("=");r[t[0]]=t[1]}),r},exports._set=function(e,t,r){if(e.hasOwnProperty(t))throw new Error("Trying to override req property");Object.defineProperty(e,t,{value:r})},exports._express=function(e){return function(t,r){e(t,r,i),t.next()}};
//# sourceMappingURL=lieve.js.map
