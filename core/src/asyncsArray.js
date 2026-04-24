// Реалізація Callback-based (error-first) з підтримкою AbortController
export function filterCallback(arr, predicate, callback, signal) {
    const results = [];
    let completed = 0;
    let aborted = false;

    const cleanup = () => {
        if (signal) signal.removeEventListener('abort', onAbort);
    };

    const onAbort = () => {
        if (aborted) return;
        aborted = true;
        cleanup();
        callback(new Error('AbortError'), null);
    };

    if (signal?.aborted) return onAbort();
    signal?.addEventListener('abort', onAbort);

    arr.forEach((item, index) => {
        setTimeout(() => {
            if (aborted) return;

            predicate(item, (err, isKeep) => {
                if (aborted) return;
                
                if (err) {
                    aborted = true;
                    cleanup();
                    return callback(err, null);
                }

                if (isKeep) results[index] = item;
                completed++;

                if (completed === arr.length) {
                    cleanup();
                    callback(null, results.filter(x => x !== undefined));
                }
            });
        }, 50);
    });
}

export function filterPromise(arr, predicate, signal) {
    return new Promise((resolve, reject) => {
        filterCallback(
            arr, 
            (item, cb) => predicate(item).then(v => cb(null, v)).catch(e => cb(e, null)),
            (err, res) => (err ? reject(err) : resolve(res)),
            signal
        );
    });
}