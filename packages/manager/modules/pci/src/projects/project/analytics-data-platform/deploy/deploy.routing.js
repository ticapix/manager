import get from 'lodash/get';
import { PCI_REDIRECT_URLS } from '../../../../constants';

export default /* @ngInject */($stateProvider) => {
  $stateProvider.state('pci.projects.project.analytics-data-platform.deploy', {
    url: '/deploy',
    component: 'deployComponent',
    resolve: {
      breadcrumb: /* @ngInject */ $translate => $translate.instant('analytics_data_platform_deploy_breadscrum'),
      capabilities: /* @ngInject */
      analyticsDataPlatformService => analyticsDataPlatformService
        .getAnalyticsDataPlatformCapabilities(),

      publicCloud: /* @ngInject */ (
        analyticsDataPlatformService,
        projectId,
      ) => analyticsDataPlatformService.getPubliCloudDetails(projectId),

      sshKeys: /* @ngInject */ (
        analyticsDataPlatformService,
        projectId,
      ) => analyticsDataPlatformService.getShhKeys(projectId),

      vRack: /* @ngInject */ (
        analyticsDataPlatformService,
        projectId,
      ) => analyticsDataPlatformService.getVRacks(projectId),

      priceCatalog: /* @ngInject */ (
        analyticsDataPlatformService,
        publicCloud,
      ) => analyticsDataPlatformService.getPriceCatalog(publicCloud.planCode),
      hasDefaultPaymentMethod: /* @ngInject */
      ovhPaymentMethod => ovhPaymentMethod.hasDefaultPaymentMethod(),

      paymentMethodUrl: /* @ngInject */ coreConfig => get(
        PCI_REDIRECT_URLS,
        `${coreConfig.getRegion()}.paymentMethods`,
      ),
    },
  });
};
