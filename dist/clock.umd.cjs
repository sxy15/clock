(function(i,n){typeof exports=="object"&&typeof module<"u"?n(exports):typeof define=="function"&&define.amd?define(["exports"],n):(i=typeof globalThis<"u"?globalThis:i||self,n(i.clock={}))})(this,function(i){"use strict";var k=Object.defineProperty;var w=(i,n,c)=>n in i?k(i,n,{enumerable:!0,configurable:!0,writable:!0,value:c}):i[n]=c;var l=(i,n,c)=>(w(i,typeof n!="symbol"?n+"":n,c),c);const n=window.cancelAnimationFrame||window.clearTimeout;let c=Date.now();function f(s){const e=Date.now(),t=Math.max(0,16-(e-c)),o=setTimeout(s,t);return c=e+t,o}const h=window.requestAnimationFrame||f;function u(s){return h.call(window,s)}function d(s){n.call(window,s)}function m(s,e){return Math.floor(s/1e3)===Math.floor(e/1e3)}function a(){return`${Date.now()}-${Math.random().toString().slice(2,8)}`}class T{constructor(e){l(this,"immutableTime");l(this,"immutableLocalTime");l(this,"runTime");l(this,"currentServeTime");l(this,"rafId");l(this,"listen");l(this,"clocks");this.immutableTime=e,this.currentServeTime=e,this.immutableLocalTime=Date.now(),this.runTime=0,this.rafId=0,this.listen=[],this.clocks=[],this.tick()}get _clocks(){return this.clocks.filter(({done:e})=>!e)}addClock(e){const t=e.id??a();return this.clocks.push({...e,id:t}),t}cancelClock(e){const t=this.clocks.findIndex(o=>o.id===e);t!==-1&&this.clocks.splice(t,1)}addListen(e){this.listen.push({id:a(),listen:e})}cancelListen(e){const t=this.listen.findIndex(o=>o.id===e);t!==-1&&this.listen.splice(t,1)}tick(){this.rafId=u(()=>{var t;const e=this.getRunTime();if(!m(e,this.runTime)){this.runTime=e,this.currentServeTime=this.immutableTime+e;const o=this._clocks;if(o.length)for(const r of o)r.time<=this.currentServeTime&&!r.done&&(r.done=!0,(t=r.listen)==null||t.call(r));this.listen.forEach(({listen:r})=>{r()})}this.tick()})}getRunTime(){return Date.now()-this.immutableLocalTime}destroy(){d(this.rafId)}}i.cancelRaf=d,i.createId=a,i.default=T,i.isSameSecond=m,i.raf=u,Object.defineProperties(i,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});