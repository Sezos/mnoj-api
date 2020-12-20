var {
    spawn
} = require('child_process');

module.exports = (binaryPath) => new Promise(function (resolve, reject) {
    run = spawn(`${binaryPath}`);
    run.stdout.on('data', (data) => {
        resolve(data);
    });
    run.on('error', (error) => {
        reject(error);
    });
});