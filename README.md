# clock2listen

### Install

```
npm i clock2listen
```

### Usage

```js
import ClockTimer from 'clock2listen'

let timer = null

timer = new ClockTimer(Date.now())

// Triggered every second
const cancelId = timer.addListen(() => {
    console.log('1s')
})

// Triggered at a specific time
timer.addClock({
    time: Date.now() + 1000 * 6,
    listen: () => {
        console.log('6s')
        timer.cancelListen(cancelId) // cancel listen
    },
    id: 'six'
})
```

## `constructor(time: number)`

The constructor is used to create an instance of `ClockTimer`.

**Parameters**:

- `time` (number): The initial server time in milliseconds.


## `addClock(clock: {time: number; listen: () => void; id?: string;}): string`
Adds a clock task to be executed at a specified time.

**Parameters**:
- `clock` (object): An object containing the following properties.
    - `time` (number): The time at which the task should be executed in milliseconds.
    - `listen` (function): The callback function to be called when the task is executed.
    - `id` (string): A unique identifier for the task. If not provided, a unique identifier will be generated.

**Returns**:
- `id`(string): The unique identifier of the added clock task.


## `cancelClock(id: string)`
Cancels a clock task with the specified identifier.

**Parameters**:
- `id` (string): The unique identifier of the task to cancel.

## `addListen(listen: () => void): string`
Adds a listener to be triggered on every second update.

**Parameters**:
- `listen` (function): The callback function to be called on every second update.

**Returns**:
- `id`(string): The unique identifier of the added listener.

## `cancelListen(id: string)`
Cancels a listener with the specified identifier.

**Parameters**:
- `id` (string): The unique identifier of the listener to cancel.

## `destroy()`
Destroys the ClockTimer instance, stopping the timer.