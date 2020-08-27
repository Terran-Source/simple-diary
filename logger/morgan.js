const morgan = require('morgan');
const { isProd } = require('./common');

module.exports = (app) => {
  let morganTemplate =
    ':method :url HTTP/:http-version :status :res[content-length] - :response-time ms';
  if (!isProd) {
    morganTemplate =
      ':remote-addr :remote-user ' + morganTemplate + ' ":referrer"';
  }
  app.use(morgan(morganTemplate));
};
