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
        ($q, clusterId, enterpriseCloudDatabaseService) => enterpriseCloudDatabaseService
          .getUser(clusterId)
          .catch(error => ((error.status === 404) ? null : $q.reject(error))),
    },
    translations: {
      value: ['.'],
      format: 'json',
    },
    url: '/details',
  });
};
