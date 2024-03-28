//Requiring modules
const express = require('express');
const http = require('http');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const httpProxy = require('http-proxy');
const debug = require('debug')('app');

//Create Express Project
const app = express();
//Read port number from config
const PORT = process.env.PORT || 3000;

//Rate Limit Middleware
const limiter = rateLimit(
    {
        windowMs: 60 * 1000, // 1 minute
        max: 10, //Limit to 10 request per minute
        message: 'Rate limit exceeded. Please try again later',
    });

// apply rate limit to all requests
app.use(limiter);

//Loging middleware
app.use(morgan('combined'));

app.get('/', (request, response) => {
    response.send('Welcome to the gateway');
    response.end();
})

//Create a proxy to handle load balancing
const proxy = httpProxy.createProxyServer();

//Load balancing setup

const services = [
    {target: 'http://localhost:3001'}, //Service 1
    {target: 'http://localhost:3002'}, //Service 2
    {target: 'http://localhost:3003'}, //Service 3
]

app.use('/service*', (req, res) => {
    const {url} = req;
    const selectedService = services[Math.floor(Math.random() * services.length)];
    proxy.web(req, res, {target: selectedService.target + url});
});


http.createServer((req, res) => {
    res.end('Service 1 responds');
}).listen(3001);

http.createServer((req, res) => {
    res.end('Service 2 responds');
}).listen(3002);

http.createServer((req, res) => {
    res.end('Service 3 responds');
}).listen(3003);

// app.listen(PORT, () => {
//     debug(`Server is started on port ${PORT}`)
// });

const server = http.createServer(app);
server.listen(PORT, () => {
   console.log(`Edge gatway is running  on http://localhost:${PORT}`);
});
