export function* generateTaskId() {
    let id = 1;
    while (true) {
        yield `TASK-${id++}`;
    }
}

export function processTasksWithTimeout(iterator, timeoutSeconds) {
    while (true) {
        const nextTask = iterator.next().value;
        console.log(`Processing: ${nextTask}`);
    }
}