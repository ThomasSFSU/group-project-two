const { format } = require('date-fns');
const { v4: uuid} = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async ( message, logName ) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm::ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        let logPath = path.join(__dirname, '..', 'logs');
        if (!fs.existsSync(logPath)){
            await fsPromises.mkdir(logPath);
        }
        await fsPromises.appendFile(path.join(logPath, logName), logItem);
    } catch (err){
        console.log(err);
    }
}

const logger =  (req, res, next) => {
    logEvents(`${req.method} ${req.headers.origin} ${req.url}`, "reqLog.txt");
    console.log(`${req.method} ${req.path} ${req.hostname}`);
    next();
}
module.exports = {logEvents, logger};