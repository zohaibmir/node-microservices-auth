/**
 * Using Cluster Model (Autocannon for performance  testing)
 * 1. Improve parallel processing
 * 2. Enhanced scalability and resource utilization
 */

const http = require('http');
//Importing the cluster module  to enable the creation of child processes
const cluster = require('cluster');

//Determine the  number of available cpu cores
const numCPUs = require('os').cpus().length;

//checking if the current process is the master process
if (cluster.isMaster) {
    console.log(`Primary ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    const server = http.createServer((req, res) => {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Clustered App!\n');
    });

    const port = 3000;

    server.listen(port, () => {
        console.log(`Worker ${process.pid} started listening on port ${port}`);
    })
    //Running Node.js will now share port 3000 between the workers:
}
/**
 * AutoCannon for performance testing
 * autocannon -c 100 -d 100 http://localhost:3000
 * Running 10s test @ http://localhost:3000
 * 100 connections
 *
 *
 * ┌─────────┬──────┬──────┬───────┬──────┬────────┬─────────┬───────┐
 * │ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%  │ Avg    │ Stdev   │ Max   │
 * ├─────────┼──────┼──────┼───────┼──────┼────────┼─────────┼───────┤
 * │ Latency │ 2 ms │ 2 ms │ 4 ms  │ 5 ms │ 2.5 ms │ 0.87 ms │ 37 ms │
 * └─────────┴──────┴──────┴───────┴──────┴────────┴─────────┴───────┘
 * ┌───────────┬─────────┬─────────┬─────────┬─────────┬──────────┬──────────┬─────────┐
 * │ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg      │ Stdev    │ Min     │
 * ├───────────┼─────────┼─────────┼─────────┼─────────┼──────────┼──────────┼─────────┤
 * │ Req/Sec   │ 27,759  │ 27,759  │ 32,895  │ 33,759  │ 32,457.6 │ 1,651.54 │ 27,744  │
 * ├───────────┼─────────┼─────────┼─────────┼─────────┼──────────┼──────────┼─────────┤
 * │ Bytes/Sec │ 5.05 MB │ 5.05 MB │ 5.99 MB │ 6.14 MB │ 5.91 MB  │ 302 kB   │ 5.05 MB │
 * └───────────┴─────────┴─────────┴─────────┴─────────┴──────────┴──────────┴─────────┘
 *
 * Req/Bytes counts sampled once per second.
 * # of samples: 10
 *
 * 325k requests in 10.04s, 59.1 MB read
 */
