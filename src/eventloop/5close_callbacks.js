//handle resource clean up e.g. closing file handlers or sockets.
const http = require('http');

const server = http.createServer((req, res) => {
    //Handle http requests
});
// Start the server on port 8080
server.listen(8080, () => {
    console.log('Server is running on port 8080');
});

//Event: Server is shutting down

process.on('SIGINT', () => {
    //Perform cleanup and resources realease
    performCleanup(() => {
        //close the server and exit the application
        server.close(() => {
            console.log('Server is closed. Application is now exiting');
            process.exit(0);
        });
    });
});

//Function to perform cleanup tasks
function performCleanup(callback) {
    //Save application data, close databases connections, release resources, etc.
    console.log('Performing clean up tasks...');
    //Simulate asynch cleanup tasks (e.g. saving data)
    setTimeout(() => {
        console.log('Performing cleanup tasks');
        callback();
    }, 3000); //Simulating 3 seconds cleanup
}
