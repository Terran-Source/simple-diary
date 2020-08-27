const _prodEnvironments = ['prod', 'dr'];
const _testEnvironments = ['test', 'uat', 'alfa', 'beta'];
const _localEnvironment = 'local';
module.exports = {
  isProd: _prodEnvironments.includes(process.appConfig.environment),
  isTest: _testEnvironments.includes(process.appConfig.environment),
  isLocal: _localEnvironment === process.appConfig.environment,
};
