const debug = require('debug')('app:logMiddlware');
const myLogger = function (req, res, next) {
    debug(`[${new Date().toLocaleDateString()}] ${req.method} ${req.path}`);
    next();
}

module.exports = myLogger;
