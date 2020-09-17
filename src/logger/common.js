const _prodEnvironments = ['prod', 'dr'];
const _testEnvironments = ['test', 'uat', 'alfa', 'beta'];
const _localEnvironment = 'local';
module.exports = {
  isProd: _prodEnvironments.includes(appConfig.environment),
  isTest: _testEnvironments.includes(appConfig.environment),
  isLocal: _localEnvironment === appConfig.environment,
};
