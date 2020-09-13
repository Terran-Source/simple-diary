import express from 'express';
import expHbs from 'express-handlebars';
import session from 'express-session';
import path from 'path';
import connectDb from './db/mongo';
import InjectorBase from './injector';
const { loadConfig } = require('@terran-source/dotconfig');

// DI instance
global.Injector = new InjectorBase();

// Load app configuration
const { parsed, error } = loadConfig(true, { path: 'config/config.json' });
if (error) {
  console.error(error);
  process.exit(1);
}
//process.appConfig = parsed;

// For environment specific decisions
const { isProd, isLocal } = require('./logger/common');

// inject globally used config
Injector.add('googleConfig', process.appConfig.google);
Injector.add('appInfo', process.appConfig.appInfo);

if (isLocal) {
  console.log(
    'Application config:' + `\n${JSON.stringify(process.appConfig, null, 2)}`
  );
}

// Initialize express
const app = express();
Injector.add('app', app);

// Add Logging
import morganLog from './logger/morgan';
morganLog();
import bunyanLogger from './logger/stack-driver-bunyan';
import getStackDriverConfig from './logger/get-stack-driver-config';
const stackDriverConfig = getStackDriverConfig();
if (null !== stackDriverConfig) {
  global.Logger = bunyanLogger(stackDriverConfig);
} else {
  console.error('Logger cannot be instantiated. Exiting...');
  process.exit(1);
}

// Connect to Database
connectDb(process.appConfig.db['mongo']).then((mongoose) => {
  Injector.add('mongoose', mongoose);

  //// Services
  require('./services/userService');
  require('./services/journalService');
  //// Services

  //// Middleware
  // - Handlebars template engine
  app.set('views', path.join(__dirname, 'views'));
  app.engine('.hbs', expHbs({ defaultLayout: 'main', extname: '.hbs' }));
  app.set('view engine', '.hbs');

  // - Session
  const MongoStore = require('connect-mongo')(session);
  let sessionOptions: session.SessionOptions = {
    secret: process.appConfig.session.secret,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: process.appConfig.session.collection,
    }),
  };
  if (isProd) {
    if (sessionOptions.cookie) sessionOptions.cookie.secure = true;
    else sessionOptions.cookie = { secure: true };
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
    Logger.info(
      `Application "${process.appConfig.appName}" is running` +
        ` in "${process.appConfig.environment}" mode on port: ${port}`
    );
  });
});
