export function* generateTaskId() {
    let id = 1;
    while (true) {
        yield `TASK-${id++}`;
    }
}

export function processTasksWithTimeout(iterator, timeoutSeconds) {
    const endTime = Date.now() + (timeoutSeconds * 1000);
    let tasksProcessed = 0;

    while (Date.now() < endTime) {
        const nextTask = iterator.next().value;
        console.log(`Processing: ${nextTask}`);
        tasksProcessed++;
    }
    
    console.log(`Finished. Total tasks: ${tasksProcessed}`);
    return tasksProcessed;
}