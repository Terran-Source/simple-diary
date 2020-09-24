// DI instance
import InjectorBase from './injector';
global.Injector = new InjectorBase();

import express from 'express';
import expHbs from 'express-handlebars';
import session from 'express-session';
import path from 'path';
const { loadConfig } = require('dots-config');

// Load app configuration
try {
  global.appConfig = loadConfig(true, { path: 'config/config.json' });
} catch (error) {
  console.error(error);
  process.exit(1);
}

// inject globally used config
Injector.add('googleConfig', appConfig.google);
Injector.add('appInfo', appConfig.appInfo);

// For environment specific decisions
import { isProd, isLocal } from './logger/common';

if (isLocal) {
  console.log(
    'Application config:' + `\n${JSON.stringify(appConfig, null, 2)}`
  );
}

// Initialize express
const app = express();
Injector.add('app', app);

// Body Parsers
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

// other imports depends upon previous resolvers
import connectDb from './db/mongo';
//// Services
require('./services/UserService');
require('./services/JournalService');
//// Services
import enablePassportAuth from './auth/passport';

// Connect to Database
connectDb(appConfig.db['mongo']).then((mongoose) => {
  //// Middleware
  // - Handlebars template engine
  app.set('views', path.join(__dirname, 'views'));
  app.engine('.hbs', expHbs({ defaultLayout: 'main', extname: '.hbs' }));
  app.set('view engine', '.hbs');

  // - Session
  const MongoStore = require('connect-mongo')(session);
  let sessionOptions: session.SessionOptions = {
    secret: appConfig.session.secret,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: appConfig.session.collection,
    }),
  };
  if (isProd) {
    if (sessionOptions.cookie) sessionOptions.cookie.secure = true;
    else sessionOptions.cookie = { secure: true };
  }
  app.use(session(sessionOptions));

  // - Passport
  enablePassportAuth();

  // - Static folder
  app.use(express.static(path.join(__dirname, 'assets')));

  // - Routes
  app.use('/', require('./routes'));
  app.use('/auth', require('./routes/auth'));
  app.use('/journals', require('./routes/journals'));
  //// Middleware

  // Start listening
  const port = appConfig.port || 80;
  app.listen(port, () => {
    Logger.info(
      `Application "${appConfig.appName}" is running` +
        ` in "${appConfig.environment}" mode on port: ${port}`
    );
  });
});
