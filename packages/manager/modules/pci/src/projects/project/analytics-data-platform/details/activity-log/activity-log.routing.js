export default /* @ngInject */($stateProvider) => {
  $stateProvider.state('pci.projects.project.analytics-data-platform.details.log', {
    url: '/log',
    component: 'activityLogComponent',
    resolve: {
      serviceName: /* @ngInject */ $stateParams => $stateParams.serviceName,

      activities: /* @ngInject */ (
        CucServiceHelper,
        analyticsDataPlatformService,
        serviceName,
      ) => analyticsDataPlatformService.getAnalyticsDataPlatformActivityLogs(serviceName)
        .catch(error => CucServiceHelper.errorHandler('analytics_data_platform_get_activities_error')(error)),

      breadcrumb: /* @ngInject */ $translate => $translate.instant('analytics_data_platform_service_activity_breadscrum'),
    },
  });
};
