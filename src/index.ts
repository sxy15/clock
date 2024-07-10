const iCancel = window.cancelAnimationFrame || window.clearTimeout;

let prev = Date.now();
function fallback(fn: FrameRequestCallback): number {
  const curr = Date.now();
  const ms = Math.max(0, 16 - (curr - prev));
  const id = setTimeout(fn, ms);
  prev = curr + ms;
  return id;
}

const iRaf = window.requestAnimationFrame || fallback;

export function raf(fn: FrameRequestCallback): number {
  return iRaf.call(window, fn);
}

export function cancelRaf(id: number) {
  iCancel.call(window, id);
}

export function isSameSecond(time1: number, time2: number): boolean {
  return Math.floor(time1 / 1000) === Math.floor(time2 / 1000);
}

export function createId() {
  return `${Date.now()}-${Math.random().toString().slice(2, 8)}`
}

class ClockTimer {
  immutableTime: number // 初始化服务器时间 毫秒
  immutableLocalTime: number // 本地不可变时间 用来计算运行了多久 毫秒
  runTime: number // 运行的时间 毫秒
  currentServeTime: number // 计算出来的服务器时间 毫秒
  rafId: number
  listen: Array<{id: string; listen: (time?: number) => void}>
  clocks: Array<{time: number; listen: () => void; done?: boolean, id?: string}>

  constructor(time: number) {
    this.immutableTime = time
    this.currentServeTime = time
    this.immutableLocalTime = Date.now()
    this.runTime = 0;
    this.rafId = 0;
    this.listen = [];
    this.clocks = [];

    this.tick()
  }

  get _clocks() {
    return this.clocks.filter(({done}) => !done);
  }

  addClock(clock: {time: number; listen: () => void; id?: string;}): string {
    const _id = clock.id ?? createId()
    this.clocks.push({...clock, id: _id});
    return _id
  }

  cancelClock(id: string) {
    const index = this.clocks.findIndex(clock => clock.id === id);
    if (index !== -1) {
      this.clocks.splice(index, 1);
    }
  }

  addListen(listen: (time?: number) => void) {
    const id = createId()
    this.listen.push({id, listen})
    return id
  }

  cancelListen(id: string) {
    const index = this.listen.findIndex(listen => listen.id === id);
    if (index !== -1) {
      this.listen.splice(index, 1);
    }
  }

  tick() {
    this.rafId = raf(() => {
      const runTime = this.getRunTime();
      if(!isSameSecond(runTime, this.runTime)) {
        this.runTime = runTime
        this.currentServeTime = this.immutableTime + runTime
        const clocks = this._clocks
        if(clocks.length) {
          for (const clock of clocks) {
            if (clock.time <= this.currentServeTime && !clock.done) {
              clock.done = true;
              clock.listen?.();
            }
          }
        }
        this.listen.forEach(({listen}) => {
          listen(this.currentServeTime)
        });
      }

      this.tick()
    })
  }

  getRunTime() {
    return Date.now() - this.immutableLocalTime;
  }

  destroy() {
    cancelRaf(this.rafId)
  }
}

export default ClockTimer
