const express = require('express');
const expHbs = require('express-handlebars');
const session = require('express-session');
const path = require('path');
const { loadConfig } = require('@terran-source/dotconfig');
import connectDb from './db/mongo';

// DI instance
global.injector = require('./injector');

// Load app configuration
const { error } = loadConfig(true, { path: './config/config.json' });
if (error) {
  console.error(error);
  process.exit(1);
}

// For environment specific decisions
const { isProd, isLocal } = require('./logger/common');

// inject globally used config
injector.add('googleConfig', process.appConfig.google);
injector.add('appInfo', process.appConfig.appInfo);

if (isLocal) {
  console.log(
    'Application config:' + `\n${JSON.stringify(process.appConfig, null, 2)}`
  );
}

// Initialize express
const app = express();
injector.add('app', app);

// Add Logging
require('./logger/morgan')();
const stackDriverConfig = require('./logger/stack-driver-config')();
process.logger = require('./logger/stack-driver')(stackDriverConfig.logConfig);

// Connect to Database
connectDb(process.appConfig.db).then((mongoose) => {
  injector.add('mongoose', mongoose);

  //// Services
  require('./services/userService');
  require('./services/journalService');
  //// Services

  //// Middleware
  // - Handlebars template engine
  app.engine('.hbs', expHbs({ defaultLayout: 'main', extname: '.hbs' }));
  app.set('view engine', '.hbs');

  // - Session
  const MongoStore = require('connect-mongo')(session);
  let sessionOptions = {
    secret: process.appConfig.session.secret,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: process.appConfig.session.collection,
    }),
  };
  if (isProd) {
    sessionOptions.cookie.secure = true;
  }
  app.use(session(sessionOptions));

  // - Passport
  require('./auth/passport')();

  // - Static folder
  app.use(express.static(path.join(__dirname, 'assets')));

  // - Routes
  app.use('/', require('./routes'));
  app.use('/auth', require('./routes/auth'));
  app.use('/journals', require('./routes/journals'));
  //// Middleware

  // Start listening
  const port = process.appConfig.port || 80;
  app.listen(port, () => {
    process.logger.info(
      `Application "${process.appConfig.appName}" is running` +
        ` in "${process.appConfig.environment}" mode on port: ${port}`
    );
  });
});
