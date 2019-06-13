const winston = require('winston');
const moment = require('moment');
const { config } = require('winston');


const consoleTransport = new winston.transports.Console({
  timestamp() {
    return moment().format('YYYY-MM-DD HH:MM:ss');
  },
  formatter(options) {
    // - Return string will be passed to logger.
    // - Optionally, use options.colorize(options.level, <string>) to
    //   colorize output based on the log level.
    return `${options.timestamp()} ${
      config.colorize(options.level, options.level.toUpperCase())} ${
      options.message ? options.message : ''
    }${options.meta && Object.keys(options.meta).length ? `\n\t${JSON.stringify(options.meta)}` : ''}`;
  },
});


const transports = [consoleTransport];

const winstonLogger = new (winston.Logger)({
  level: process.env.LOGGING_LEVEL || 'error',
  transports,
});

// utility that converts error objects so they can be stringified
const replaceErrors = (key, value) => {
  if (value instanceof Error) {
    const error = {};

    Object.getOwnPropertyNames(value).forEach((k) => {
      error[k] = value[k];
    });

    return error;
  }
  return value;
};

class Logger {
  constructor() {
    this.logger = winstonLogger;
  }

  error(message, ...moreArgs) {
    try {
      const args = Array.prototype.slice.call(moreArgs, 0);

      const merged = { message };

      for (let i = 0; i < args.length; i++) {
        const keys = Object.keys(args[i]);
        const values = Object.values(args[i]);
        merged[keys[0]] = values[0];
      }
      const stringified = JSON.stringify(merged, replaceErrors);
      this.logger.error(stringified);
    } catch (e) {
      this.logger.error(message);
    }
  }

  debug(message) {
    this.logger.debug(message);
  }

  info(message) {
    this.logger.info(message);
  }

  warn(message) {
    this.logger.warn(message);
  }
}

module.exports = new Logger();
