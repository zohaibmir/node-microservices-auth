const winston = require('winston');
const debug = require('debug')('app:logMiddlware');

//Create Winston Logger with  console and file transports

const logger = winston.createLogger(
    {
        level: 'info',
        format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({filename: 'combined.log'})
        ]
    });

//Cusotm Log method for express middleware
logger.middleware = (req, res, next) => {
    debug('Winston Logger');
    logger.info(`${req.method} ${req.url}`, {
        ip: req.ip,
        body: req.body,
        query: req.query
    });
    next();
}

module.exports = logger;
