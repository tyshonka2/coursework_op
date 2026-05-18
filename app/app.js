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

import { createDataStream, consumeStream } from 'core';

async function runDemo() {
    console.log("--- Task 6: Stream Processor ---");

    try {
        const stream = createDataStream(5);
        await consumeStream(stream, (data) => console.log("Stream Item:", data.payload));
        console.log("Stream finished successfully.");
    } catch (e) {
        console.error("Stream Producer Error:", e.message);
    }

    console.log("\n--- Testing EventStream ---");
    const es = new EventStream();
    
    es.on('data', (d) => console.log("Event Received:", d));
    es.on('error', (e) => console.error("Event Error caught:", e.message));

    try {
        es.process([{ val: "Valid 1" }, null, { val: "Valid 2" }]);
    } catch(e) {
        console.log("Main process caught re-thrown error as expected.");
    }
}

runDemo();


import { ReactiveEntity } from 'core';

const entity = new ReactiveEntity();

entity.subscribe('message', (data) => console.log("Listener 1 received:", data));

entity.subscribe('message', () => { throw new Error("I am broken!"); });

entity.subscribe('message', (data) => console.log("Listener 3 received:", data));


import { AuthProxy, JwtAuthStrategy } from 'core';

class KanbanApiService {
    constructor(httpClient) {
        this.httpClient = httpClient; 
    }

    async fetchTasks() {
        return this.httpClient.request('https://api.kanban.local/tasks');
    }
}

class MockHttpClient {
    constructor() { this.firstCall = true; }
    
    async request(url, options) {
        console.log(`[MockClient] Requesting ${url} with token: ${options.headers.get('Authorization')}`);
        
        if (this.firstCall) {
            this.firstCall = false;
            return { status: 401, json: async () => ({ error: "Expired" }) };
        }
        return { status: 200, json: async () => ({ data: ["Task 1", "Task 2"] }) };
    }
}

async function runLab8() {
    console.log("--- Lab 8: Auth Proxy & DI ---");

    let currentToken = "old-expired-token";

    const jwtStrategy = new JwtAuthStrategy(
        () => currentToken,
        async () => {       
            console.log("[App] Fetching new token from auth server...");
            currentToken = "new-fresh-token-123"; 
        }
    );

    const baseClient = new MockHttpClient(); 
    const authProxy = new AuthProxy(baseClient, jwtStrategy);
    const apiService = new KanbanApiService(authProxy);

    const response = await apiService.fetchTasks();
    const data = await response.json();
    
    console.log("[App] Final Response Status:", response.status);
    console.log("[App] Data:", data);
}

runLab8();



import { createLogDecorator } from 'core';

const customFileTransport = {
    log: (msg) => console.log(`[FILE_WRITE_LOG] ${msg}`),
    error: (msg) => console.error(`[FILE_WRITE_ERROR] ${msg}`)
};

const logInfo = createLogDecorator({ level: 'INFO', formatter: JSON.stringify });
const logErrorOnly = createLogDecorator({ level: 'ERROR', transport: customFileTransport });

function calculateComplexitySync(points) {
    if (points < 0) throw new Error("Points cannot be negative");
    return points * 2;
}

async function fetchUserDataAsync(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId === 0) reject(new Error("User ID not found"));
            else resolve({ id: userId, name: "Student" });
        }, 100);
    });
}

const safeCalculate = logInfo(calculateComplexitySync);
const safeFetch = logErrorOnly(fetchUserDataAsync);

async function runLab9() {
    console.log("--- Lab 9: Logging Decorator ---");
    
    console.log("\n1. INFO Level (Sync) - Успіх:");
    safeCalculate(5); 
    
    console.log("\n2. INFO Level (Sync) - Помилка:");
    try { safeCalculate(-1); } catch (e) {}

    console.log("\n3. ERROR Level (Async) - Успіх (НЕ ПОВИННО ЛОГУВАТИСЯ):");
    await safeFetch(1);
    
    console.log("\n4. ERROR Level (Async) - Помилка (ПОВИННО ЛОГУВАТИСЯ):");
    try { await safeFetch(0); } catch (e) {}
}

runLab9();