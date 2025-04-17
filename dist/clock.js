var a = Object.defineProperty;
var l = (e, i, t) => i in e ? a(e, i, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[i] = t;
var c = (e, i, t) => (l(e, typeof i != "symbol" ? i + "" : i, t), t);
const m = window.cancelAnimationFrame || window.clearTimeout;
let r = Date.now();
function u(e) {
  const i = Date.now(), t = Math.max(0, 16 - (i - r)), n = setTimeout(e, t);
  return r = i + t, n;
}
const h = window.requestAnimationFrame || u;
function d(e) {
  return h.call(window, e);
}
function f(e) {
  m.call(window, e);
}
function T(e, i) {
  return Math.floor(e / 1e3) === Math.floor(i / 1e3);
}
function o() {
  return `${Date.now()}-${Math.random().toString().slice(2, 8)}`;
}
class k {
  constructor(i) {
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
    this.immutableTime = i, this.currentServeTime = i, this.immutableLocalTime = Date.now(), this.runTime = 0, this.rafId = 0, this.listen = [], this.clocks = [], this.tick();
  }
  get _clocks() {
    return this.clocks.filter(({ done: i }) => !i);
  }
  addClock(i) {
    if (i.id && this.clocks.some((n) => n.id === i.id))
      return;
    const t = i.id ?? o();
    return this.clocks.push({ ...i, id: t }), t;
  }
  cancelClock(i) {
    const t = this.clocks.findIndex((n) => n.id === i);
    t !== -1 && this.clocks.splice(t, 1);
  }
  addListen(i) {
    const t = o();
    return this.listen.push({ id: t, listen: i }), t;
  }
  cancelListen(i) {
    const t = this.listen.findIndex((n) => n.id === i);
    t !== -1 && this.listen.splice(t, 1);
  }
  tick() {
    this.rafId = d(() => {
      var t;
      const i = this.getRunTime();
      if (!T(i, this.runTime)) {
        this.runTime = i, this.currentServeTime = this.immutableTime + i;
        const n = this._clocks;
        if (n.length)
          for (const s of n)
            s.time <= this.currentServeTime && !s.done && (s.done = !0, (t = s.listen) == null || t.call(s));
        this.listen.forEach(({ listen: s }) => {
          s(this.currentServeTime);
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
  o as createId,
  k as default,
  T as isSameSecond,
  d as raf
};
