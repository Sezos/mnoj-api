var crypto = require("crypto");

module.exports = (s) => {
    var md5sum = crypto.createHash('md5');
    md5sum.update(s);
    return md5sum.digest('hex');
}