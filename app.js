//Requiring modules
const express = require('express');
const debug = require('debug')('app');
//Create Express Project
const app = express();
//Read port number from config
const PORT = process.env.PORT || 8080;

app.get('/', (request, response) => {
    response.send('Hello from root');
    response.end();
})

app.listen(PORT, () => {
    debug(`Server is started on port ${PORT}`)
});



