import { generateTaskId } from 'kanban-core';

const idGen = generateTaskId();
console.log("Створено нову задачу:", idGen.next().value);
console.log("Створено нову задачу:", idGen.next().value);

import { memoize } from 'core';


const expensiveOperation = (num) => {
    console.log(`>>> Виконую важкий розрахунок для числа: ${num}`);
    return num * 2;
};


const memoizedFunc = memoize(expensiveOperation, { maxSize: 2 });

console.log("--- Спроба 1 (5): ---");
console.log("Результат:", memoizedFunc(5)); 

console.log("\n--- Спроба 2 (5) - повтор: ---");
console.log("Результат:", memoizedFunc(5)); 

console.log("\n--- Спроба 3 (10): ---");
console.log("Результат:", memoizedFunc(10)); 

console.log("\n--- Спроба 4 (5) - після переповнення кешу: ---");
console.log("Результат:", memoizedFunc(5)); 
