export default /* @ngInject */($stateProvider) => {
  $stateProvider.state('enterprise-cloud-database.service.details.restored-instances', {
    component: 'enterpriseCloudDatabaseServiceDetailsRestoredInstancesComponent',
    translations: {
      value: ['.'],
      format: 'json',
    },
    url: '/restored-instances',
    resolve: {
      restoredInstances: /* @ngInject */
        (clusterId, enterpriseCloudDatabaseService) => enterpriseCloudDatabaseService
          .getRestoreList(clusterId),
      endpoints: /* @ngInject */
        (clusterId, enterpriseCloudDatabaseService) => enterpriseCloudDatabaseService
          .getEndpointsWithDetails(clusterId),
      goBackToRestore: /* @ngInject */
        ($state, CucCloudMessage) => (message = false, type = 'success', clusterId = null) => {
          const reload = message && type === 'success';
          const state = 'enterprise-cloud-database.service.details.restored-instances';
          const promise = $state.go(state, {
            clusterId,
          },
          {
            reload,
          });
          if (message) {
            promise.then(() => {
              CucCloudMessage[type](message, state);
            });
          }
          return promise;
        },
    },
  });
};
