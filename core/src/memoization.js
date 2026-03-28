export function memoize(fn, { 
    maxSize = 10, 
    policy = 'LRU', 
    ttl = 5000, 
    customEvict = null 
} = {}) {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        const now = Date.now();

        if (cache.has(key)) {
            const entry = cache.get(key);
            if (policy === 'TTL' && now > entry.expiry) {
                cache.delete(key);
            } else {
                entry.frequency++;
                entry.lastUsed = now;
                return entry.result;
            }
        }

        if (cache.size >= maxSize) {
            evict(cache, policy, customEvict);
        }

        const result = fn(...args);
        cache.set(key, { result, lastUsed: now, frequency: 1, expiry: now + ttl });
        return result;
    };
}

function evict(cache, policy, customEvict) {
    if (customEvict) return customEvict(cache);
    let keyToEvict;
    if (policy === 'LRU') keyToEvict = cache.keys().next().value;
    else if (policy === 'LFU') keyToEvict = [...cache.entries()].sort((a, b) => a[1].frequency - b[1].frequency)[0][0];
    else if (policy === 'TTL') keyToEvict = [...cache.entries()].sort((a, b) => a[1].expiry - b[1].expiry)[0][0];
    if (keyToEvict) cache.delete(keyToEvict);
}