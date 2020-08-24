const logger = (app, logType, logConfig = {}) => {
  switch (logType) {
    case 'morgan':
      return require('./morgan')(app);
    case 'stackDriver':
      return require('./stack-driver')(logConfig);
    default:
      process.logger.error(`Logger of type ${logType} is not supported yet`);
      throw `Logger of type ${logType} is not supported yet`;
  }
};

module.exports = logger;
