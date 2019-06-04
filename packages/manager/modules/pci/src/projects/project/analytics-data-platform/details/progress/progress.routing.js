export default /* @ngInject */($stateProvider) => {
  $stateProvider.state('pci.projects.project.analytics-data-platform.details.progress', {
    url: '/progress',
    component: 'progressComponent',
    redirectTo: transition => transition
      .injector()
      .getAsync('platformDetails')
      .then((platformDetails) => {
        const analyticsDataPlatformService = transition.injector().get('analyticsDataPlatformService');
        return analyticsDataPlatformService.isDeploymentInProgress(platformDetails)
          ? false
          : { state: 'pci.projects.project.analytics-data-platform.details.service' };
      }),

    resolve: {
      goToServicePage: /* @ngInject */ servicePage => servicePage,
      serviceName: /* @ngInject */ $stateParams => $stateParams.serviceName,
      platformDetails: /* @ngInject */ (
        CucServiceHelper,
        analyticsDataPlatformService,
        serviceName,
      ) => analyticsDataPlatformService.getAnalyticsDataPlatformDetails(serviceName)
        .catch(error => CucServiceHelper.errorHandler('analytics_data_platform_get_cluster_error')(error)),

      accountDetails: /* @ngInject */ (
        CucServiceHelper,
        analyticsDataPlatformService,
      ) => analyticsDataPlatformService.getAccountDetails()
        .catch(error => CucServiceHelper.errorHandler('analytics_data_platform_get_account_details_error')(error)),

      progress: /* @ngInject */ (
        CucServiceHelper,
        analyticsDataPlatformService,
        serviceName,
      ) => analyticsDataPlatformService.getStatus(serviceName)
        .catch(error => CucServiceHelper.errorHandler('analytics_data_platform_tracking_progress_get_status_error')(error)),

      breadcrumb: /* @ngInject */ $translate => $translate.instant('analytics_data_platform_tracking_progress_breadscrum'),
    },
  });
};
