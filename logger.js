const fs = require('fs');
const path = require('path');

class Logger {
    constructor(logFilePath) {
        this.logLevels = {
            INFO: 'INFO',
            WARN: 'WARN',
            ERROR: 'ERROR'
        };
        this.logFilePath = logFilePath;
    }

    log(message, level = this.logLevels.INFO) {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] [${level}] ${message}`;
        console.log(logMessage); // Log to console

        if (this.logFilePath) {
            this.writeToFile(logMessage); // Write to file
        }
    }

    writeToFile(message) {
        fs.appendFile(this.logFilePath, message + '\n', (err) => {
            if (err) {
                console.error('Error writing to log file:', err);
            }
        });
    }

    info(message) {
        this.log(message, this.logLevels.INFO);
    }

    warn(message) {
        this.log(message, this.logLevels.WARN);
    }

    error(message) {
        this.log(message, this.logLevels.ERROR);
    }
}

module.exports = { Logger };
