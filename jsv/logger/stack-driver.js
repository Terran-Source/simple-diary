const bunyan = require('bunyan');
const { LoggingBunyan } = require('@google-cloud/logging-bunyan');
const { isProd } = require('./common');

const logger = (logConfig) => {
  // Creates a Bunyan StackDriver Logging client
  const loggingBunyan = new LoggingBunyan({
    logName: `${logConfig.appInstance}_log`,
    //projectId: logConfig.projectId,
  });

  const logLevel = isProd ? 'info' : 'trace';

  // Create a Bunyan logger that streams to StackDriver Logging
  // Logs will be written to: "projects/YOUR_PROJECT_ID/logs/bunyan_log"
  const logger = bunyan.createLogger({
    // The JSON payload of the log as it appears in StackDriver Logging
    name: logConfig.appInstance,
    src: true,
    streams: [
      // Log to the console
      {
        stream: process.stdout,
        level: logLevel,
      },
      // And log to StackDriver Logging
      loggingBunyan.stream(logLevel),
    ],
    environment: logConfig.environment,
    logType: 'application-log',
  });
  return logger;
};

module.exports = logger;
