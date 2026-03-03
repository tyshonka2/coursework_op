import { generateTaskId } from 'kanban-core';

const idGen = generateTaskId();
console.log("Створено нову задачу:", idGen.next().value);
console.log("Створено нову задачу:", idGen.next().value);
