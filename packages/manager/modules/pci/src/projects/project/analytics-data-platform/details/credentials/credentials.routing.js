export default /* @ngInject */($stateProvider) => {
  $stateProvider.state('pci.projects.project.analytics-data-platform.details.credentials', {
    url: '/credentials',
    component: 'credentialsComponent',
    resolve: {
      serviceName: /* @ngInject */ $stateParams => $stateParams.serviceName,
      platformDetails: /* @ngInject */ (
        CucServiceHelper,
        analyticsDataPlatformService,
        serviceName,
      ) => analyticsDataPlatformService.getAnalyticsDataPlatformDetails(serviceName)
        .catch(error => CucServiceHelper.errorHandler('analytics_data_platform_get_cluster_error')(error)),
      breadcrumb: /* @ngInject */ $translate => $translate.instant('analytics_data_platform_service_credentials_breadscrum'),
    },
  });
};
