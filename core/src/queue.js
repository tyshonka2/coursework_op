export class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(item, priority) {
        this.items.push({ item, priority, timestamp: Date.now() });
    }

    _findIdx(mode) {
        if (this.items.length === 0) return -1;
        
        return this.items.reduce((bestIdx, _, currIdx) => {
            const best = this.items[bestIdx];
            const curr = this.items[currIdx];

            if (mode === 'highest') return curr.priority > best.priority ? currIdx : bestIdx;
            if (mode === 'lowest') return curr.priority < best.priority ? currIdx : bestIdx;
            if (mode === 'oldest') return curr.timestamp < best.timestamp ? currIdx : bestIdx;
            if (mode === 'newest') return curr.timestamp > best.timestamp ? currIdx : bestIdx;
            return bestIdx;
        }, 0);
    }

    peek(mode) {
        const idx = this._findIdx(mode);
        return idx !== -1 ? this.items[idx].item : null;
    }

    dequeue(mode) {
        const idx = this._findIdx(mode);
        return idx !== -1 ? this.items.splice(idx, 1)[0].item : null;
    }
}