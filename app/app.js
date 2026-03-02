import { generateTaskId } from '../core/index.js';

const idGen = generateTaskId();
console.log("Створено нову задачу:", idGen.next().value);
