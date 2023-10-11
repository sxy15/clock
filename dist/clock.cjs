"use strict";var m=Object.defineProperty;var d=(i,e,t)=>e in i?m(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var c=(i,e,t)=>(d(i,typeof e!="symbol"?e+"":e,t),t);Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const h=window.cancelAnimationFrame||window.clearTimeout;let r=Date.now();function f(i){const e=Date.now(),t=Math.max(0,16-(e-r)),n=setTimeout(i,t);return r=e+t,n}const T=window.requestAnimationFrame||f;function a(i){return T.call(window,i)}function l(i){h.call(window,i)}function u(i,e){return Math.floor(i/1e3)===Math.floor(e/1e3)}function o(){return`${Date.now()}-${Math.random().toString().slice(2,8)}`}class w{constructor(e){c(this,"immutableTime");c(this,"immutableLocalTime");c(this,"runTime");c(this,"currentServeTime");c(this,"rafId");c(this,"listen");c(this,"clocks");this.immutableTime=e,this.currentServeTime=e,this.immutableLocalTime=Date.now(),this.runTime=0,this.rafId=0,this.listen=[],this.clocks=[],this.tick()}get _clocks(){return this.clocks.filter(({done:e})=>!e)}addClock(e){const t=e.id??o();return this.clocks.push({...e,id:t}),t}cancelClock(e){const t=this.clocks.findIndex(n=>n.id===e);t!==-1&&this.clocks.splice(t,1)}addListen(e){const t=o();return this.listen.push({id:t,listen:e}),t}cancelListen(e){const t=this.listen.findIndex(n=>n.id===e);t!==-1&&this.listen.splice(t,1)}tick(){this.rafId=a(()=>{var t;const e=this.getRunTime();if(!u(e,this.runTime)){this.runTime=e,this.currentServeTime=this.immutableTime+e;const n=this._clocks;if(n.length)for(const s of n)s.time<=this.currentServeTime&&!s.done&&(s.done=!0,(t=s.listen)==null||t.call(s));this.listen.forEach(({listen:s})=>{s()})}this.tick()})}getRunTime(){return Date.now()-this.immutableLocalTime}destroy(){l(this.rafId)}}exports.cancelRaf=l;exports.createId=o;exports.default=w;exports.isSameSecond=u;exports.raf=a;
