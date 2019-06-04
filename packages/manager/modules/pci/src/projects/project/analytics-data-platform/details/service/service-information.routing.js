export default /* @ngInject */($stateProvider) => {
  $stateProvider.state('pci.projects.project.analytics-data-platform.details.service', {
    url: '/service',
    component: 'serviceInformationComponent',
    resolve: {
      serviceName: /* @ngInject */ $stateParams => $stateParams.serviceName,

      platformDetails: /* @ngInject */ (
        CucServiceHelper,
        analyticsDataPlatformService,
        serviceName,
      ) => analyticsDataPlatformService.getAnalyticsDataPlatformDetails(serviceName)
        .catch(error => CucServiceHelper.errorHandler('analytics_data_platform_get_cluster_error')(error)),

      publicCloudDetails: /* @ngInject */ (
        CucServiceHelper,
        analyticsDataPlatformService,
        projectId,
      ) => analyticsDataPlatformService.getPubliCloudDetails(projectId)
        .catch(error => CucServiceHelper.errorHandler('analytics_data_platform_get_cluster_info_error')(error)),

      terminate: /* @ngInject */ (
        $state,
        projectId,
        serviceName,
      ) => () => $state.go('pci.projects.project.analytics-data-platform.details.service.terminate', { projectId, serviceName }),

      breadcrumb: /* @ngInject */ $translate => $translate.instant('analytics_data_platform_tile_breadscrum'),

      billingConsole: /* @ngInject */ ($state, projectId) => () => $state.go('pci.projects.project.billing', { projectId }),
    },
  });
};
