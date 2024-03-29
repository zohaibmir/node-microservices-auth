const nodeCache = require('node-cache');
const cache = new nodeCache();
const nodeData = function (cacheKey) {
    const cacheData = cache.get(cacheKey);
    if (cacheData) {
        console.log('Data is served from cache');

        return cacheData;
    } else {
        const newData = {'message': 'This is the fresh data'};
        cache.set(cacheKey, newData, 10); //cache for 10 seconds
        console.log('Data fetched from server and now cached');

        return newData;
    }
}

module.exports = nodeData;
