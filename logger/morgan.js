const morgan = require('morgan');
const prodEnvironments = ['prod', 'dr'];

module.exports = (app) => {
  if (!prodEnvironments.includes(process.appConfig.environment)) {
    app.use(morgan('dev'));
  }
};
