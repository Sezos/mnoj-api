module.exports = (code) => {
    checks = [/freopen\(.*?\)/g, /system\(.*?\)/g, /FILE/g];

    for (check of checks) {
        if (code.match(check)) return true;
    }

    return false;
}