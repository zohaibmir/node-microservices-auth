//Io operations are checked, if operation are ready call back added to queue. e.g. a node app monitoring log file
const fs = require('fs');
const readLine = require('readline');

//Path to log file to watch
const logFilePath = 'app.log';

//Create a readable stream to watch for changes in the log file
const logStream = fs.createReadStream(logFilePath);

//Create a readline interface for procesing line from the log file
const readLineInterface = readLine.createInterface(
    {
        input: logStream,
        output: process.stdout,
        terminal: false
    });

//Event handler for new lines in the log file
readLineInterface.on('line', (line) => {
    //process and analuze the log entry in real time
    console.log(`New Log entry ${line}`);
})

