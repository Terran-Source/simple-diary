const _prodEnvironments = ['prod', 'dr'];
const _testEnvironments = ['test', 'uat', 'alfa', 'beta'];
const _localEnvironment = ['local', 'dev'];

export const isProd: boolean = _prodEnvironments.includes(
  appConfig.environment
);
export const isTest: boolean = _testEnvironments.includes(
  appConfig.environment
);
export const isLocal: boolean = _localEnvironment.includes(
  appConfig.environment
);
