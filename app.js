const express = require('express');
const expHbs = require('express-handlebars');
const path = require('path');
const { loadConfig } = require('@terran-source/dotconfig');
const connectDb = require('./db');

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

// Initialize handlebars template engine
app.engine('.hbs', expHbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// Static folder
app.use(express.static(path.join(__dirname, 'assets')));

// Add Logging
require('./logger/morgan')(app);
const stackDriverConfig = require('./logger/stack-driver-config')(
  process.appConfig.environment,
  process.appConfig.appInstance,
  process.appConfig.google
);
process.logger = require('./logger/stack-driver')(stackDriverConfig.logConfig);

// Adding Routes
app.use('/', require('./routes'));

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
