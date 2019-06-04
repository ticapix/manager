import get from 'lodash/get';
import { PCI_REDIRECT_URLS } from '../../../../constants';

export default /* @ngInject */($stateProvider) => {
  $stateProvider.state('pci.projects.project.analytics-data-platform.deploy', {
    url: '/deploy',
    component: 'deployComponent',
    resolve: {
      breadcrumb: /* @ngInject */ $translate => $translate.instant('analytics_data_platform_deploy_breadscrum'),
      capabilities: /* @ngInject */ (
        CucServiceHelper,
        analyticsDataPlatformService,
      ) => analyticsDataPlatformService.getAnalyticsDataPlatformCapabilities()
        .catch(error => CucServiceHelper.errorHandler('analytics_data_platform_get_capabilities_error')(error)),
      publicCloud: /* @ngInject */ (
        CucServiceHelper,
        analyticsDataPlatformService,
        projectId,
      ) => analyticsDataPlatformService.getPubliCloudDetails(projectId)
        .catch(error => CucServiceHelper.errorHandler('analytics_data_platform_get_cloud_error')(error)),
      sshKeys: /* @ngInject */ (
        CucServiceHelper,
        analyticsDataPlatformService,
        projectId,
      ) => analyticsDataPlatformService.getShhKeys(projectId)
        .catch(error => CucServiceHelper.errorHandler('analytics_data_platform_get_ssh_keys_error')(error)),
      vRack: /* @ngInject */ (
        CucServiceHelper,
        analyticsDataPlatformService,
        projectId,
      ) => analyticsDataPlatformService.getVRacks(projectId)
        .catch(error => CucServiceHelper.errorHandler('analytics_data_platform_get_vracks_error')(error)),
      priceCatalog: /* @ngInject */ (
        CucServiceHelper,
        analyticsDataPlatformService,
        publicCloud,
      ) => analyticsDataPlatformService.getPriceCatalog(publicCloud.planCode)
        .catch(error => CucServiceHelper.errorHandler('analytics_data_platform_get_price_catalog_error')(error)),
      hasDefaultPaymentMethod: /* @ngInject */ (
        CucServiceHelper,
        ovhPaymentMethod,
      ) => ovhPaymentMethod.hasDefaultPaymentMethod()
        .catch(error => CucServiceHelper.errorHandler('analytics_data_platform_get_default_payment_method_error')(error)),
      paymentMethodUrl: /* @ngInject */ coreConfig => get(
        PCI_REDIRECT_URLS,
        `${coreConfig.getRegion()}.paymentMethods`,
      ),
    },
  });
};
