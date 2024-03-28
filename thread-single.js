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
/**
 * AutoCannon for performance testing
 * autocannon -c 100 -d 100 http://localhost:3000
 * Running 10s test @ http://localhost:3000
 * 100 connections
 *
 *
 * ┌─────────┬──────┬──────┬───────┬──────┬─────────┬─────────┬───────┐
 * │ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%  │ Avg     │ Stdev   │ Max   │
 * ├─────────┼──────┼──────┼───────┼──────┼─────────┼─────────┼───────┤
 * │ Latency │ 2 ms │ 3 ms │ 5 ms  │ 6 ms │ 3.01 ms │ 0.98 ms │ 35 ms │
 * └─────────┴──────┴──────┴───────┴──────┴─────────┴─────────┴───────┘
 * ┌───────────┬────────┬────────┬────────┬─────────┬───────────┬──────────┬─────────┐
 * │ Stat      │ 1%     │ 2.5%   │ 50%    │ 97.5%   │ Avg       │ Stdev    │ Min     │
 * ├───────────┼────────┼────────┼────────┼─────────┼───────────┼──────────┼─────────┤
 * │ Req/Sec   │ 26,943 │ 26,943 │ 28,559 │ 30,799  │ 28,493.82 │ 1,082.74 │ 26,939  │
 * ├───────────┼────────┼────────┼────────┼─────────┼───────────┼──────────┼─────────┤
 * │ Bytes/Sec │ 5.1 MB │ 5.1 MB │ 5.4 MB │ 5.82 MB │ 5.39 MB   │ 204 kB   │ 5.09 MB │
 * └───────────┴────────┴────────┴────────┴─────────┴───────────┴──────────┴─────────┘
 *
 * Req/Bytes counts sampled once per second.
 * # of samples: 11
 *
 * 314k requests in 11.03s, 59.2 MB read
 */
