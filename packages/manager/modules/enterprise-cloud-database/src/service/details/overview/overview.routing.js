export default /* @ngInject */($stateProvider) => {
  $stateProvider.state('enterprise-cloud-database.service.details.overview', {
    component: 'enterpriseCloudDatabaseServiceDetailsOverviewComponent',
    translations: {
      value: ['.'],
      format: 'json',
    },
    url: '/overview',
    resolve: {
      endPoints: /* @ngInject */
        (clusterId, enterpriseCloudDatabaseService) => enterpriseCloudDatabaseService
          .getEndpointsWithDetails(clusterId),
      hosts: /* @ngInject */
        (clusterId, enterpriseCloudDatabaseService) => enterpriseCloudDatabaseService
          .getHostsWithDetails(clusterId),
      serviceInfo: /* @ngInject */
        (clusterId, enterpriseCloudDatabaseService) => enterpriseCloudDatabaseService
          .getServiceInfo(clusterId),
    },
  });
};
