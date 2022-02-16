const winston = require("winston");
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};
winston.addColors(colors);

const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "warn";
};
const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);
const Logger = winston.createLogger({
  level: level(),
  levels,
  exitOnError: false,
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(winston.format.json()),
    }),
  ],
});
module.exports = Logger;
