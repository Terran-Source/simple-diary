const bunyan = require('bunyan');
const { LoggingBunyan } = require('@google-cloud/logging-bunyan');

const logger = (logConfig) => {
  // Creates a Bunyan StackDriver Logging client
  const loggingBunyan = new LoggingBunyan({
    projectId: logConfig.projectId,
    keyFilename: logConfig.keyFilename,
  });

  // Create a Bunyan logger that streams to StackDriver Logging
  // Logs will be written to: "projects/YOUR_PROJECT_ID/logs/bunyan_log"
  const logger = bunyan.createLogger({
    // The JSON payload of the log as it appears in StackDriver Logging
    name: logConfig.appInstance,
    streams: [
      // Log to the console at 'info' and above
      {
        stream: process.stdout,
        level: 'info',
      },
      // And log to StackDriver Logging, logging at 'info' and above
      loggingBunyan.stream('info'),
    ],
  });
  return logger;
};

module.exports = logger;
