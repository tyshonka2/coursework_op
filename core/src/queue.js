export class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(item, priority) {
        this.items.push({ item, priority, timestamp: Date.now() });
    }
}