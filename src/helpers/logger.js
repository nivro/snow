const { createLogger, format, transports } = require('winston')

let loggerInstance = null // Singleton instance

const createConfigurableLogger = (customConfig = {}) => {
  if (loggerInstance) {
    return loggerInstance // Return the existing instance
  }

  const config = {
    level: 'info', // Default log level
    logToConsole: true,
    logToFile: false,
    logFilePath: 'logs/app.log',
    env: 'development',
    ...customConfig
  }

  // Define a pretty format for console logs
  const prettyConsoleFormat = format.combine(
    format.colorize(), // Add color to log levels
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Human-readable timestamps
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}][${level}]: ${message}`
    })
  )

  // Define transports
  const loggerTransports = []
  if (config.logToConsole) {
    loggerTransports.push(
      new transports.Console({
        format: config.env === 'development' ? prettyConsoleFormat : format.json()
      })
    )
  }
  if (config.logToFile) {
    loggerTransports.push(
      new transports.File({
        filename: config.logFilePath,
        level: config.level,
        format: format.combine(format.timestamp(), format.json())
      })
    )
  }

  // Create the logger instance
  loggerInstance = createLogger({
    level: config.level,
    transports: loggerTransports
  })

  return loggerInstance
}

module.exports = createConfigurableLogger
