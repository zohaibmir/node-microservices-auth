/**
 * Single Threaded Execution (Autocannon for performance  testing)
 * 1. increase response time under load
 * 2. Limit utilization of multi-core cpus
 */

const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Single Threaded App!\n')
});

const port = 3000;

server.listen(port, () => {
    console.log(`Single Threaded server is listening on port ${port}`);
})
