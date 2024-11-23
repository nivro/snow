const Database = require('better-sqlite3');
const createLogger = require('../helpers/logger')


class SnowDB {
    constructor(db_path) {
        this.logger = createLogger()
        this.db = new Database(db_path)
    }

    query(query, params = []) {
        this.logger.info(`running query: ${query}`)
        const stmt = this.db.prepare(query)
        return stmt.all(params)
    }
    run(query, params = []) {
        this.logger.info(`running query: ${query}`)
        const stmt = this.db.prepare(query)
        return stmt.run(params)
    }
}

module.exports = SnowDB

