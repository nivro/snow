const process = require('process');
module.exports = {
    logger: {
        level: process.env.LOG_LEVEL || 'info',
        logToFile: true,
        logFilePath: process.env.LOG_FILE || 'logs/app.log',
        logToConsole: true,
        env: process.env.NODE_ENV || 'development',
    },
    whatsapp: {
        clientConfig: {
            dataPath: 'auth-generated/',
            clientId: 'client'
        }
    },
    db: {
        path: 'db/db.db'
    },
    modules: {
        authentication: {},
        ai: {
            image: {
                model: "dall-e-3",
                size: "1024x1024"
            }
        }
    }
};