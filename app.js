//Requiring modules
const express = require('express');
const http = require('http');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const httpProxy = require('http-proxy');
const debug = require('debug')('app');
const cors = require('cors');
//Adding Router Services
const userService = require('./src/routers/userRouter');
const productService = require('./src/routers/productRouter');
const orderService = require('./src/routers/orderRouter');

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
//we can also apply limited to specific path app.use('/limited', limiter);

//Loging middleware
app.use(morgan('combined'));

//Use path base routing
app.use('/users', userService);
app.use('/products', productService);
app.use('/orders', orderService);

//Custom Logging Midleware
logRequestMiddlware = require('./src/middlewares/log/logRequest')
app.use(logRequestMiddlware);

//Session Midleware
sessionMiddlware = require('./src/middlewares/auth/session-based-access')
app.use(sessionMiddlware.session);

//Role Based Access
const auth = require('./src/middlewares/auth/role-base-access');
const {roles} = require("./src/middlewares/auth/role-base-access");
const adminRole = auth.roles.admin;
const token = auth.generateToken(adminRole);
debug('Generated Token: ' + token);


//Use Cache Middlware

let cache = require('./src/middlewares/cache/api-cache');

//Cache all routes
//app.use(cache('1 minute'));
app.get('/', (request, response) => {
    response.send('Welcome to the gateway');
    response.end();
})

app.get('/login', (req, res) => {
    const {authenticated} = req.session;

    if (!authenticated) {
        req.session.authenticated = true;
        res.send('Successfully authenticated');
    } else {
        res.send('Already authenticated');
    }
});

app.get('/logout', sessionMiddlware.protect, (req, res) => {
    req.session.destroy(() => {
        res.send('Successfully logged out');
    });
});

app.get('/protected', sessionMiddlware.protect, (req, res) => {
    const {name = "user"} = req.query;
    res.send(`Hello from protected service ${name}`);
})

//Role based access Routes
app.get('/public', cache('2 minutes'), (req, res) => {
    res.json({message: 'Public route'});
});

app.get('/admin', auth.authenticateUser(roles.admin), (req, res) => {
    res.json({message: 'Admmin Route'});
    //we can access the admin route with curl command curl -H "Authorization: token" url
});

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


//Run the Parallel Tasks
const parallelism = require('./src/middlewares/parallelism');
//parallelism();
app.listen(PORT, () => {
    debug(`Edge gatway is running  on http://localhost:${PORT}`);
});

// const server = http.createServer(app);
// server.listen(PORT, () => {
//     debug(`Edge gatway is running  on http://localhost:${PORT}`);
// });
