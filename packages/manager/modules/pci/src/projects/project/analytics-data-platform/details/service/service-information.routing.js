export default /* @ngInject */($stateProvider) => {
  $stateProvider.state('pci.projects.project.analytics-data-platform.details.service', {
    url: '/service',
    component: 'serviceInformationComponent',
    resolve: {
      serviceName: /* @ngInject */ $stateParams => $stateParams.serviceName,

      platformDetails: /* @ngInject */ (
        analyticsDataPlatformService,
        serviceName,
      ) => analyticsDataPlatformService.getAnalyticsDataPlatformDetails(serviceName),

      publicCloudDetails: /* @ngInject */ (
        analyticsDataPlatformService,
        projectId,
      ) => analyticsDataPlatformService.getPubliCloudDetails(projectId),

      terminate: /* @ngInject */ (
        $state,
        projectId,
        serviceName,
      ) => () => $state.go('pci.projects.project.analytics-data-platform.details.service.terminate', { projectId, serviceName }),

      breadcrumb: /* @ngInject */ $translate => $translate.instant('analytics_data_platform_tile_breadcrumb'),

      billingConsole: /* @ngInject */ ($state, projectId) => () => $state.go('pci.projects.project.billing', { projectId }),
    },
  });
};
