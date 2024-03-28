//Dedicated to Io call backs deffered from previous loop cycle. e.g. waiting for db result
const fs = require('fs');

//List of files to read
const filesToRead = ['file1.txt', 'file2.txt', 'file3.txt'];

//Function to proces date from each file
function processDataFromFile(data, fileName) {
    //implement data processing logic
    console.log(`Processing data from file ${fileName}`);
}

//Function to read a file
function readFileAndProcess(fileName) {
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading the file ${fileName}: ${err}`);
            return;
        }

        processDataFromFile(data, fileName);
    });
}

//Iterate through the list of files
filesToRead.forEach((fileName) => {
    readFileAndProcess(fileName);
});

// Perform further processing when all files have been read
process.nextTick(() => {
    console.log('All file reads have completed. Started data processing');
})
