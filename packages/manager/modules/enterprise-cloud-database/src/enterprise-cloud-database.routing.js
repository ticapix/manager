export default /* @ngInject */($stateProvider) => {
  $stateProvider.state('enterprise-cloud-database', {
    component: 'enterpriseCloudDatabaseComponent',
    translations: {
      value: ['.'],
      format: 'json',
    },
    url: '/enterprise-cloud-database',
    resolve: {
      capabilities: /* @ngInject */ enterpriseCloudDatabaseService => enterpriseCloudDatabaseService
        .getOffers(),
      clusters: /* @ngInject */ enterpriseCloudDatabaseService => enterpriseCloudDatabaseService
        .getClusterList(),
      goBackToList: /* @ngInject */ ($state, CucCloudMessage) => (message = false, type = 'success', clusterId = null) => {
        const reload = message && type === 'success';
        const state = 'enterprise-cloud-database';
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
      defaultPaymentMethod: /* @ngInject */
        enterpriseCloudDatabaseService => enterpriseCloudDatabaseService.getDefaultPaymentMethod(),
    },
  });
};
