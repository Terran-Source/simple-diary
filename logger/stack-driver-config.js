const appInfo = injector.resolve('appInfo');
const googleConfig = injector.resolve('googleConfig');

const stackDriverConfig = () => {
  return {
    logType: 'stackDriver',
    logConfig: {
      environment: appInfo.environment,
      appInstance: appInfo.appInstance,
      projectId: googleConfig.projectId,
    },
  };
};

module.exports = stackDriverConfig;
