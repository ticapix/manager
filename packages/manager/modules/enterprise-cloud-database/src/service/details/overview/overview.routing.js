export default /* @ngInject */($stateProvider) => {
  $stateProvider.state('enterprise-cloud-database.service.details.overview', {
    component: 'enterpriseCloudDatabaseServiceDetailsOverviewComponent',
    translations: {
      value: ['.'],
      format: 'json',
    },
    url: '/overview',
    resolve: {
      serviceInfo: /* @ngInject */
        (clusterId, enterpriseCloudDatabaseService) => enterpriseCloudDatabaseService
          .getServiceInfo(clusterId),
    },
  });
};
