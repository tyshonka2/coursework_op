export async function* createDataStream(count) {
    for (let i = 0; i < count; i++) {
        if (Math.random() < 0.1) {
            throw new Error(`Data corruption at index ${i}`);
        }
        yield { id: i, payload: `Task data ${i}` };
    }
}

import { EventEmitter } from 'events';

export async function consumeStream(stream, processor) {
    for await (const chunk of stream) {
        processor(chunk);
    }
}

export class EventStream extends EventEmitter {
    process(dataArray) {
        for (const item of dataArray) {
            try {
                if (!item) throw new Error("Null data received");
                this.emit('data', item);
            } catch (err) {
                this.emit('error', err);
                throw err; 
            }
        }
        this.emit('end');
    }
}