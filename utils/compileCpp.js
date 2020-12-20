var {
    spawn
} = require('child_process');

module.exports = (input, output) => new Promise(function (resolve, reject) {
    compileProcess = spawn('g++', [input, '-o', output]);

    compileProcess.on('close', (code) => {
        resolve(code);
    });

    compileProcess.on('error', (data) => {
        reject(data);
    })
});