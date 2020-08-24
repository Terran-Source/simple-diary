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
let logConfig = {};
switch (process.appConfig.logging.type) {
  case 'morgan':
    break;
  case 'stackDriver':
    const stackDriverConfig = require('./logger/stack-driver-config')(
      process.appConfig.environment,
      process.appConfig.appInstance,
      process.appConfig.google
    );
    logConfig = stackDriverConfig.logConfig;
    break;
  default:
    console.error(
      `Logger of type ${process.appConfig.logging.type} is not supported yet`
    );
    process.exit(1);
}
process.logger = logger(app, process.appConfig.logging.type, logConfig);

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
