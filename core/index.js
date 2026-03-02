export function* generateTaskId() {
    let id = 1;
    while (true) {
        yield `TASK-${id++}`;
    }
}