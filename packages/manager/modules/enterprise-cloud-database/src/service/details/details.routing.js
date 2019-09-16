export default /* @ngInject */($stateProvider) => {
  $stateProvider.state('enterprise-cloud-database.service.details', {
    abstract: true,
    cache: false,
    component: 'enterpriseCloudDatabaseServiceDetailsComponent',
    resolve: {
      securityGroups: /* @ngInject */
        (clusterId, enterpriseCloudDatabaseService) => enterpriseCloudDatabaseService
          .getSecurityGroupList(clusterId),
      clusterUser: /* @ngInject */
        (clusterId, enterpriseCloudDatabaseService) => enterpriseCloudDatabaseService
          .getUser(clusterId),
    },
    translations: {
      value: ['.'],
      format: 'json',
    },
    url: '/details',
  });
};
