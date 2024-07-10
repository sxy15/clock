import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import ClockTimer from '../src/index';

describe('ClockTimer', () => {
  let clockTimer = null
  let startTime = Date.now();

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(startTime);
    clockTimer = new ClockTimer(startTime);
  })

  afterEach(() => {
    clockTimer.destroy()
    vi.useRealTimers();
  })

  it('should be a class', () => {
    expect(ClockTimer).toBeInstanceOf(Function);
  })

  it('should create a new instance', () => {
    expect(clockTimer).toBeInstanceOf(ClockTimer);
  })

  it('add clock', () => {
    const callback = vi.fn();
    const id = clockTimer.addClock({
      time: startTime + 1000,
      listen: callback,
    });
    expect(typeof id).toBe('string');
    expect(callback).not.toBeCalled();

    vi.advanceTimersByTime(1000);
    vi.runOnlyPendingTimers()
    expect(callback).toHaveBeenCalled();
  })

  it('cancel clock', () => {
    const callback = vi.fn();
    const id1 = clockTimer.addClock({
      time: startTime + 1000,
      listen: callback,
    });
    const id2 = clockTimer.addClock({
      time: startTime + 2000,
      listen: callback,
      id: 'id2'
    });
    expect(clockTimer.clocks.length).toBe(2);
    clockTimer.cancelClock(id1);
    clockTimer.cancelClock(id2);
    expect(clockTimer.clocks.length).toBe(0);
  })

  it('add listen', () => {
    const callback = vi.fn();
    const id = clockTimer.addListen(callback);
    expect(clockTimer.listen.length).toBe(1);
    expect(typeof id).toBe('string');
    vi.advanceTimersByTime(1000);
    vi.runOnlyPendingTimers()
    expect(callback).toHaveBeenCalled();
  })

  it('remove listen', () => {
    const callback = vi.fn();
    const id = clockTimer.addListen(callback);
    expect(clockTimer.listen.length).toBe(1);
    clockTimer.cancelListen(id);
    expect(clockTimer.listen.length).toBe(0);
  })

  it('destroy', () => {
    const callback = vi.fn();
    clockTimer.addListen(callback);
    expect(clockTimer.listen.length).toBe(1);
    clockTimer.destroy();
    vi.advanceTimersByTime(1000);
    vi.runOnlyPendingTimers()
    expect(callback).not.toBeCalled();
  })
});