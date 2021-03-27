var {
    spawn
} = require('child_process');

module.exports = (binaryPath, timeout) => new Promise(function (resolve, reject) {
    var run = spawn(`${binaryPath}`, [], {
        timeout: timeout || 10000,
        maxBuffer: 1024 * 1024 * 500
    });
    var startTime = Date.now();

    run.on('close', (data) => {
        endTime = Date.now();

        resolve(`${endTime - startTime}ms`);
    });

    run.on('error', (error) => {
        reject(error);
    });
});