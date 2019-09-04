export default /* @ngInject */($stateProvider) => {
  $stateProvider.state('enterprise-cloud-database.service', {
    abstract: true,
    component: 'enterpriseCloudDatabaseServiceComponent',
    resolve: {
      clusterDetails: /* @ngInject */
        (clusterId, enterpriseCloudDatabaseService) => enterpriseCloudDatabaseService
          .getClusterDetails(clusterId),
      gotoClusterDetails: /* @ngInject */ ($state, clusterId) => () => $state.go('enterprise-cloud-database.service.details.overview', { clusterId }),
      clusterId: /* @ngInject */ $transition$ => $transition$.params().clusterId,
      clusterType: /* @ngInject */ () => 'postgresql',
    },
    translations: {
      value: ['.'],
      format: 'json',
    },
    url: '/service/:clusterId',
  });
};
