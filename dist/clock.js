var a = Object.defineProperty;
var l = (e, t, i) => t in e ? a(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i;
var c = (e, t, i) => (l(e, typeof t != "symbol" ? t + "" : t, i), i);
const m = window.cancelAnimationFrame || window.clearTimeout;
let o = Date.now();
function u(e) {
  const t = Date.now(), i = Math.max(0, 16 - (t - o)), n = setTimeout(e, i);
  return o = t + i, n;
}
const h = window.requestAnimationFrame || u;
function d(e) {
  return h.call(window, e);
}
function f(e) {
  m.call(window, e);
}
function T(e, t) {
  return Math.floor(e / 1e3) === Math.floor(t / 1e3);
}
function r() {
  return `${Date.now()}-${Math.random().toString().slice(2, 8)}`;
}
class k {
  constructor(t) {
    c(this, "immutableTime");
    // 初始化服务器时间 毫秒
    c(this, "immutableLocalTime");
    // 本地不可变时间 用来计算运行了多久 毫秒
    c(this, "runTime");
    // 运行的时间 毫秒
    c(this, "currentServeTime");
    // 计算出来的服务器时间 毫秒
    c(this, "rafId");
    c(this, "listen");
    c(this, "clocks");
    this.immutableTime = t, this.currentServeTime = t, this.immutableLocalTime = Date.now(), this.runTime = 0, this.rafId = 0, this.listen = [], this.clocks = [], this.tick();
  }
  get _clocks() {
    return this.clocks.filter(({ done: t }) => !t);
  }
  addClock(t) {
    const i = t.id ?? r();
    return this.clocks.push({ ...t, id: i }), i;
  }
  cancelClock(t) {
    const i = this.clocks.findIndex((n) => n.id === t);
    i !== -1 && this.clocks.splice(i, 1);
  }
  addListen(t) {
    const i = r();
    return this.listen.push({ id: i, listen: t }), i;
  }
  cancelListen(t) {
    const i = this.listen.findIndex((n) => n.id === t);
    i !== -1 && this.listen.splice(i, 1);
  }
  tick() {
    this.rafId = d(() => {
      var i;
      const t = this.getRunTime();
      if (!T(t, this.runTime)) {
        this.runTime = t, this.currentServeTime = this.immutableTime + t;
        const n = this._clocks;
        if (n.length)
          for (const s of n)
            s.time <= this.currentServeTime && !s.done && (s.done = !0, (i = s.listen) == null || i.call(s));
        this.listen.forEach(({ listen: s }) => {
          s();
        });
      }
      this.tick();
    });
  }
  getRunTime() {
    return Date.now() - this.immutableLocalTime;
  }
  destroy() {
    f(this.rafId);
  }
}
export {
  f as cancelRaf,
  r as createId,
  k as default,
  T as isSameSecond,
  d as raf
};
