export declare function raf(fn: FrameRequestCallback): number;
export declare function cancelRaf(id: number): void;
export declare function isSameSecond(time1: number, time2: number): boolean;
export declare function createId(): string;
declare class ClockTimer {
    immutableTime: number;
    immutableLocalTime: number;
    runTime: number;
    currentServeTime: number;
    rafId: number;
    listen: Array<{
        id: string;
        listen: () => void;
    }>;
    clocks: Array<{
        time: number;
        listen: () => void;
        done?: boolean;
        id?: string;
    }>;
    constructor(time: number);
    get _clocks(): {
        time: number;
        listen: () => void;
        done?: boolean | undefined;
        id?: string | undefined;
    }[];
    addClock(clock: {
        time: number;
        listen: () => void;
        id?: string;
    }): string;
    cancelClock(id: string): void;
    addListen(listen: () => void): string;
    cancelListen(id: string): void;
    tick(): void;
    getRunTime(): number;
    destroy(): void;
}
export default ClockTimer;
