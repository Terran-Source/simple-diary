const morgan = require('morgan');

module.exports = (app) => {
  if ('prod' !== process.appConfig.environment) {
    app.use(morgan('dev'));
  }
};
