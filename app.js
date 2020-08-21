const express = require('express');
const { loadConfig } = require('@terran-source/dotconfig');
const morgan = require('morgan');
const connectDb = require('./db');

// Load app configuration
const { error } = loadConfig(true, { path: './config/config.json' });
if (error) {
  console.error(error);
  process.exit(1);
}

// Connect to Database
connectDb(process.appConfig.db).then(() => {
  // Initialize express
  const app = express();

  // Add Logging
  if ('prod' !== process.appConfig.environment) {
    app.use(morgan('dev'));
  }

  // Start listening
  const port = process.appConfig.port || 80;
  app.listen(port, () => {
    // console.log(
    //   'Application config:' + `\n${JSON.stringify(process.appConfig, null, 2)}`
    // );
    console.log(
      `Application "${process.appConfig.appName}" is running` +
        ` in "${process.appConfig.environment}" mode on port: ${port}`
    );
  });
});
