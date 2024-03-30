const axios = require('axios');
const {data} = require("express-session/session/cookie");

async function fetchData(url) {
    try {
        const response = await axios.get(url);

        return response.data;
    } catch (error) {
        throw error;
    }
}

async function parallelTasks() {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3'
    ]

    const promises = urls.map(url => fetchData(url));
    try {
        //Use promise.all to run tasks in parallel.
        const results = await Promise.all(promises);
        //process the results
        results.forEach((data, index) => {
            console.log(`Data from ${urls[index]}:`, data);
        });
    } catch (error) {
        console.log('Error fetching data: ', error.message);
    }
}

module.exports = parallelTasks();
