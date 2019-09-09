import map from 'lodash/map';

export default /* @ngInject */($stateProvider) => {
  $stateProvider.state('enterprise-cloud-database', {
    component: 'enterpriseCloudDatabaseComponent',
    translations: {
      value: ['.'],
      format: 'json',
    },
    url: '/enterprise-cloud-database',
    resolve: {
      offers: /* @ngInject */ enterpriseCloudDatabaseService => enterpriseCloudDatabaseService
        .getOffers(),
      catalog: /* @ngInject */ enterpriseCloudDatabaseService => enterpriseCloudDatabaseService
        .getCatalog(),
      capabilities: /* @ngInject */ (
        offers,
        catalog,
        enterpriseCloudDatabaseService,
      ) => enterpriseCloudDatabaseService
        .constructor.getCapabilities(catalog, offers),
      clusters: /* @ngInject */ enterpriseCloudDatabaseService => enterpriseCloudDatabaseService
        .getClusters().then(clusters => map(clusters, clusterId => ({ id: clusterId }))),
      getClusterDetails: /* @ngInject */
        enterpriseCloudDatabaseService => clusterId => enterpriseCloudDatabaseService
          .getClusterDetails(clusterId)
          .then(details => enterpriseCloudDatabaseService.getOfferDetails(details.offerName)
            .then(offer => ({ offer, details }))),
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
