"use strict"
const { createLogger, format, transports } = require("winston");
const appRoot = require('app-root-path');    // app root 경로를 가져오는 l

require("winston-daily-rotate-file")

const fs = require("fs")

const env = process.env.NODE_ENV || "development";

const logDir = appRoot.path + '/logs';

console.log(logDir);

//Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir)
}

const dailyRotateFileTransport = new transports.DailyRotateFile({
  level: "debug",
  filename: `${logDir}/node-dashboard_%DATE%.log`,
  datePattern: "YYYYMMDD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "3d"
})

const logger = createLogger({
  level: env === "development" ? "debug" : "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    //format.json()
    format.printf(
      info => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  transports: [
    new transports.Console({
      level: "info",
      format: format.combine(
        format.colorize(),
        format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      )
    }),
    dailyRotateFileTransport
  ]
})

module.exports = logger
