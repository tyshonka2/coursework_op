export function filterCallback(arr, predicate, callback, signal) {
    const results = [];
    let completed = 0;

    arr.forEach((item, index) => {
        setTimeout(() => {
            predicate(item, (err, isKeep) => {
                if (err) return callback(err, null);
                if (isKeep) results[index] = item;
                completed++;
                if (completed === arr.length) callback(null, results.filter(x => x !== undefined));
            });
        }, 50);
    });
}