import morgan from 'morgan';
const { isProd } = require('./common');
const app = Injector.resolve('app');

export default () => {
  let morganTemplate =
    ':method :url HTTP/:http-version :status :res[content-length] - :response-time ms';
  if (!isProd) {
    morganTemplate =
      ':remote-addr :remote-user ' + morganTemplate + ' ":referrer"';
  }
  app.use(morgan(morganTemplate));
};
