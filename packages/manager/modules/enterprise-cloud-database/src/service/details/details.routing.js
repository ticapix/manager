import map from 'lodash/map';

export default /* @ngInject */($stateProvider) => {
  $stateProvider.state('enterprise-cloud-database.service.details', {
    abstract: true,
    component: 'enterpriseCloudDatabaseServiceDetailsComponent',
    resolve: {
      hosts: /* @ngInject */
        ($q, clusterId, enterpriseCloudDatabaseService) => enterpriseCloudDatabaseService
          .getHosts(clusterId)
          .then(hostIds => $q.all(
            map(hostIds,
              hostId => enterpriseCloudDatabaseService
                .getHostDetails(clusterId, hostId)),
          )),
    },
    translations: {
      value: ['.'],
      format: 'json',
    },
    url: '/details',
  });
};
