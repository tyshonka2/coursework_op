Markdown
# Kanban Core: Modular JavaScript Framework for Reactive and Asynchronous Data Processing

## Overview
This project provides a robust, modular JavaScript framework designed as the core engine for a Kanban board application. The system combines multiple architectural approaches, advanced algorithmic data structures, and design patterns into a single cohesive project. It emphasizes clean architecture, strict separation of concerns, and efficient memory management.

## Features
* **Bi-Directional Priority Queue:** Advanced task management based on custom priority and insertion order constraints.
* **Memoization and Caching:** Configurable caching system with LRU, LFU, and TTL eviction policies.
* **Async Array Operations:** Error-first callback and Promise-based variants for non-blocking data manipulation with `AbortController` support.
* **Large Data Processing (Streams):** Memory-efficient asynchronous iterators and stream processing for handling datasets that do not fit in memory.
* **Reactive Communication:** Bulletproof event-driven system with isolated listener execution and dedicated error channels.
* **Authentication Proxy:** HTTP client wrapper featuring automatic 401 token renewal and dynamic injection of authentication strategies (JWT, API Key).
* **Logging Decorators:** Configurable higher-order functions for execution profiling, synchronous/asynchronous logging, and strict level filtering (INFO, DEBUG, ERROR).
* **Dependency Injection (DI):** Decoupled architecture where core services are unaware of external loggers or network transports.

## Design Patterns Used
* **Proxy Pattern** (Auth system)
* **Decorator Pattern / Higher-Order Functions** (Logging system)
* **Observer / EventBus** (Reactive entities)
* **Strategy Pattern** (Eviction policies, Auth types)
* **Dependency Injection** (System-wide)

## Project Structure
The project utilizes NPM Workspaces to manage internal dependencies without hardcoded paths.

```text
/
├── core/         -> Core library modules (Data structures, HTTP, Streams, Reactive)
│   ├── src/      -> Source implementation files
│   ├── index.js  -> Explicit named exports (API contract)
│   └── package.json
└── app/          -> Consumer service and demo examples
    ├── app.js    -> Main demonstration script
    └── package.json
Run Example
Ensure you are in the root directory and have installed dependencies via Workspaces:

Bash
npm install
cd app
node app.js
Technologies
JavaScript (ES Modules / ES6+)

Node.js (v18+)

NPM Workspaces (Monorepo architecture)
