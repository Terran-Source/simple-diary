const stackDriverConfig = (appInstance, googleConfig) => {
  return {
    logType: 'stackDriver',
    logConfig: {
      appInstance: appInstance,
      projectId: googleConfig.projectId,
      keyFilename: googleConfig.keyFilename,
    },
  };
};

module.exports = stackDriverConfig;
