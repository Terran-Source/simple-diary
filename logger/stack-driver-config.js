const stackDriverConfig = (environment, appInstance, googleConfig) => {
  return {
    logType: 'stackDriver',
    logConfig: {
      environment: environment,
      appInstance: appInstance,
      projectId: googleConfig.projectId,
    },
  };
};

module.exports = stackDriverConfig;
