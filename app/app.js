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

import { PriorityQueue } from 'core';

const backlog = new PriorityQueue();

backlog.enqueue("Refactor auth module", 2);     
backlog.enqueue("Fix critical security bug", 10);
backlog.enqueue("Update button colors", 1);      
backlog.enqueue("Write API documentation", 5);  

console.log("--- Лаба 4: Bi-Directional Priority Queue ---");


console.log("Найважливіша задача:", backlog.peek('highest')); 
console.log("Найменш важлива задача:", backlog.peek('lowest'));
console.log("Найперша задача в черзі (Oldest):", backlog.peek('oldest'));
console.log("Остання додана задача (Newest):", backlog.peek('newest'));

console.log("\nБеремо в роботу найважливішу задачу:", backlog.dequeue('highest'));
console.log("Беремо в роботу найпершу задачу, що висить давно:", backlog.dequeue('oldest'));

console.log("\nЗалишок черги:");
console.log("Тепер найважливіша:", backlog.peek('highest'));


import { filterCallback, filterPromise } from 'core';

const controller = new AbortController();
filterCallback([1,2,3], (n, cb) => cb(null, n > 1), (err, res) => console.log(res));
