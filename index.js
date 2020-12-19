var express = require("express");
var fs = require("fs");
var crypto = require("crypto");
var bodyParser = require('body-parser');

const {
    spawn
} = require('child_process');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const computeHash = (s) => {
    var md5sum = crypto.createHash('md5');
    md5sum.update(s);
    return md5sum.digest('hex');
}

const compile = (filename, output) => new Promise(function (resolve, reject) {
    compileProcess = spawn('g++', [filename, '-o', output]);
    var error;

    compileProcess.on('close', (code) => {
        resolve(code);
    });

    compileProcess.stderr.on('data', (data) => {
        error = data;
    })

    compileProcess.on('error', (data) => {
        reject(error);
    })
});

const runSolution = (binaryPath) => {
    return new Promise(function (resolve, reject) {
        run = spawn(`./${binaryPath}`);
        run.stdout.on('data', (data) => {
            resolve(data);
        });
        run.on('error', (error) => {
            reject(error);
        });
    });
}

const checkCode = (code) => {
    checks = [/freopen\(.*?\)/g, /system\(.*?\)/g, /FILE/g];

    for (check of checks) {
        if (code.match(check)) return true;
    }

    return false;
}

app.post('/submit_solution', async (req, res) => {
    const sendResponse = (data) => res.send(JSON.stringify(data));
    const code = req.body.code;

    if (checkCode(code)) {
        sendResponse({
            output: `Illegal`
        });
        return;
    }

    const hash = computeHash(code);
    const filename = `cache/${hash}.cpp`;

    if (!fs.existsSync('cache')) {
        await fs.promises.mkdir('cache');
    }

    await fs.promises.writeFile(filename, code);

    await compile(filename, `cache/${hash}`)
        .then(
            () => runSolution(`cache/${hash}`)
            .then(
                (output) => sendResponse({
                    output: `${output}`
                }),
                (error) => sendResponse({
                    error: "Error during running",
                    msg: `${error}`,
                }),
            ),
            (error) => sendResponse({
                error: "Error during compile",
                msg: `${error}`,
            })
        );
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});