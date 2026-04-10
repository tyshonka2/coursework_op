import { generateTaskId } from 'core';

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

import { rearrangeList } from 'core';


import { insert, traverse, TreeNode } from 'core';

let root = new TreeNode(10);
insert(root, 5);
insert(root, 15);
insert(root, 3);

console.log("Результат обходу:", traverse(root)); 
