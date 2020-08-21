const express = require('express');
const { loadConfig } = require('@terran-source/dotconfig');
const connectDb = require('./db');
const logger = require('./logger');

// Load app configuration
const { error } = loadConfig(true, { path: './config/config.json' });
if (error) {
  console.error(error);
  process.exit(1);
}
// console.log(
//   'Application config:' + `\n${JSON.stringify(process.appConfig, null, 2)}`
// );

// Initialize express
const app = express();

// Add Logging
const stackDriverConfig = require('./logger/stack-driver-config')(
  process.appConfig.appInstance,
  process.appConfig.google
);
process.logger = logger(
  app,
  stackDriverConfig.logType,
  stackDriverConfig.logConfig
);

// Connect to Database
connectDb(process.appConfig.db).then(() => {
  // Start listening
  const port = process.appConfig.port || 80;
  app.listen(port, () => {
    process.logger.info(
      `Application "${process.appConfig.appName}" is running` +
        ` in "${process.appConfig.environment}" mode on port: ${port}`
    );
  });
});
