var {
    spawn
} = require('child_process');

module.exports = (binaryPath, timeout) => new Promise(function (resolve, reject) {
    var run = spawn(`${binaryPath}`);
    var startTime = Date.now();

    setTimeout(
        () => {
            run.kill();
            reject(`10s Timeout!`);
        },
        timeout || 10000
    );

    run.on('close', (data) => {
        endTime = Date.now();

        resolve(`${endTime - startTime}ms`);
    });

    run.on('error', (error) => {
        reject(error);
    });
});