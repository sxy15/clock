"use strict";var m=Object.defineProperty;var d=(t,e,i)=>e in t?m(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var c=(t,e,i)=>(d(t,typeof e!="symbol"?e+"":e,i),i);Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const h=window.cancelAnimationFrame||window.clearTimeout;let o=Date.now();function f(t){const e=Date.now(),i=Math.max(0,16-(e-o)),n=setTimeout(t,i);return o=e+i,n}const T=window.requestAnimationFrame||f;function a(t){return T.call(window,t)}function l(t){h.call(window,t)}function u(t,e){return Math.floor(t/1e3)===Math.floor(e/1e3)}function r(){return`${Date.now()}-${Math.random().toString().slice(2,8)}`}class w{constructor(e){c(this,"immutableTime");c(this,"immutableLocalTime");c(this,"runTime");c(this,"currentServeTime");c(this,"rafId");c(this,"listen");c(this,"clocks");this.immutableTime=e,this.currentServeTime=e,this.immutableLocalTime=Date.now(),this.runTime=0,this.rafId=0,this.listen=[],this.clocks=[],this.tick()}get _clocks(){return this.clocks.filter(({done:e})=>!e)}addClock(e){if(e.id&&this.clocks.some(n=>n.id===e.id))return;const i=e.id??r();return this.clocks.push({...e,id:i}),i}cancelClock(e){const i=this.clocks.findIndex(n=>n.id===e);i!==-1&&this.clocks.splice(i,1)}addListen(e){const i=r();return this.listen.push({id:i,listen:e}),i}cancelListen(e){const i=this.listen.findIndex(n=>n.id===e);i!==-1&&this.listen.splice(i,1)}tick(){this.rafId=a(()=>{var i;const e=this.getRunTime();if(!u(e,this.runTime)){this.runTime=e,this.currentServeTime=this.immutableTime+e;const n=this._clocks;if(n.length)for(const s of n)s.time<=this.currentServeTime&&!s.done&&(s.done=!0,(i=s.listen)==null||i.call(s));this.listen.forEach(({listen:s})=>{s(this.currentServeTime)})}this.tick()})}getRunTime(){return Date.now()-this.immutableLocalTime}destroy(){l(this.rafId)}}exports.cancelRaf=l;exports.createId=r;exports.default=w;exports.isSameSecond=u;exports.raf=a;
