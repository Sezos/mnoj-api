var checkCode = require("../utils/checkCode");
var fs = require("fs");
var computeHash = require("../utils/computeHash");
var runSolution = require("../utils/runSolution");
var compile = require("../utils/compileCpp");
const {
    cacheDirectory
} = require('../config');

module.exports = async (req, res) => {
    const respond = (data) => res.send(JSON.stringify(data));
    const code = req.body.code;

    if (checkCode(code)) {
        respond({
            output: "Illegal Code"
        });
        return;
    }

    const hash = computeHash(code);
    const codeSrcPath = `${cacheDirectory}/${hash}.cpp`;
    const codeBinPath = `${cacheDirectory}/${hash}`;

    await fs.promises.writeFile(codeSrcPath, code);

    try {
        await compile(codeSrcPath, codeBinPath);
    } catch (error) {
        respond({
            error: "Error during compile",
            msg: `${error}`,
        });
        return;
    }

    try {
        output = await runSolution(codeBinPath);
        respond({
            output: `${output}`
        });
    } catch (error) {
        respond({
            error: "Error during running",
            msg: `${error}`,
        });
    }
}