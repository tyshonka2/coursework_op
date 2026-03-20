export function memoize(fn, { maxSize = 10 } = {}) {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        
        if (cache.size >= maxSize) {
            cache.delete(cache.keys().next().value);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}