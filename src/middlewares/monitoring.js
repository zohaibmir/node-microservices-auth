const v8 = require('v8');
const heapdump = require('heapdump');

let leakArray = [];

//Intentional memory leak
setInterval(() => {
    for (let i = 0; i < 1000; i++) {
        leakArray.push(new Array(1000000).join('leak'))
    }
}, 1000);

//Monitoring memory usage every 5 seconds

setInterval(() => {
    const usedHeapSize = v8.getHeapStatistics().used_heap_size / 1024 / 1024;

    if (usedHeapSize > 10) {
        console.log('Heap size is increased 10MB. Capturing heap snapshot....');
        const snapshotName = `heapdump-${Date.now()}.heapsnapshot`;
        heatdump.writeSnapshot(snapshotName, (err, filename) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Heap snapshot is captured: ${filename}`);
            }
        })
    }
}, 5000);
