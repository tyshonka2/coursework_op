export async function* createDataStream(count) {
    for (let i = 0; i < count; i++) {
        if (Math.random() < 0.1) {
            throw new Error(`Data corruption at index ${i}`);
        }
        yield { id: i, payload: `Task data ${i}` };
    }
}