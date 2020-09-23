import { StackDriverConfig } from './stack-driver-bunyan';

const appInfo = Injector.resolve('appInfo');
const googleConfig = Injector.resolve('googleConfig');

const getStackDriverConfig = (): StackDriverConfig | null => {
  return appInfo && googleConfig
    ? ({
        environment: appInfo.environment,
        appInstance: appInfo.appInstance,
        projectId: googleConfig.projectId,
      } as StackDriverConfig)
    : null;
};

export default getStackDriverConfig;
