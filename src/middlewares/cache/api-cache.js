/**
 * Caching Strategies
 * 1. Full page cache 2. Object Caching 3. Assets Caching (help to reduce latency) 4. Fragment Caching 5. In memorey caching for data 6. Distributed Caching
 * Cache Expiration
 * 1. Time based expiration 2. Event based expiration 3. Lazy Loading
 * Node Caching options 1. In-memorey 2. Distributed 3. Caching Solution/Database (Redis)
 */

const apiCache = require('apicache');

const cache = apiCache.middleware;

module.exports = cache;
