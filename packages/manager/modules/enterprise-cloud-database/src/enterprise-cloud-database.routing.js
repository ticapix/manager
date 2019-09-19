import map from 'lodash/map';
import find from 'lodash/find';

import { STATUS } from './enterprise-cloud-database.constants';

export default /* @ngInject */($stateProvider) => {
  $stateProvider.state('enterprise-cloud-database', {
    component: 'enterpriseCloudDatabaseComponent',
    translations: {
      value: ['.'],
      format: 'json',
    },
    url: '/enterprise-cloud-database',
    resolve: {
      user: /* @ngInject */ enterpriseCloudDatabaseService => enterpriseCloudDatabaseService
        .getMe(),
      offers: /* @ngInject */ enterpriseCloudDatabaseService => enterpriseCloudDatabaseService
        .getOffers(),
      catalog: /* @ngInject */ (
        enterpriseCloudDatabaseService,
        user,
      ) => enterpriseCloudDatabaseService
        .getCatalog(user.ovhSubsidiary),
      capabilities: /* @ngInject */ (
        offers,
        catalog,
        enterpriseCloudDatabaseService,
      ) => enterpriseCloudDatabaseService
        .constructor.getCapabilities(catalog, offers),
      clusters: /* @ngInject */ enterpriseCloudDatabaseService => enterpriseCloudDatabaseService
        .getClusters().then(clusters => map(clusters, clusterId => ({ id: clusterId }))),
      getClusterDetails: /* @ngInject */ (
        capabilities,
        enterpriseCloudDatabaseService,
      ) => clusterId => enterpriseCloudDatabaseService
        .getClusterDetails(clusterId)
        .then(details => ({ offer: find(capabilities, { name: details.offerName }), details })),
      deleteCluster: /* @ngInject */ $state => (clusterId, clusterName) => $state
        .go('enterprise-cloud-database.delete', {
          projectId: 'projectId',
          clusterId,
          clusterName,
        }),
      gettingStarted: /* @ngInject */ $state => clusterId => $state
        .go('enterprise-cloud-database.service.get-started', { clusterId }),
      manageCluster: /* @ngInject */ $state => clusterId => $state
        .go('enterprise-cloud-database.service.details.overview', { clusterId }),
      createCluster: /* @ngInject */ $state => () => $state.go('enterprise-cloud-database.create'),
      getMyServicesURL: /* @ngInject */ () => (serviceName, serviceType) => {
        console.log('getMyServicesURL');
        return `#/billing/autoRenew?searchText=${serviceName}&selectedType=${serviceType}`;
      },
      goBackToList: /* @ngInject */ ($state, CucCloudMessage) => (message = false,
        type = STATUS.SUCCESS, clusterId = null) => {
        const reload = message && type === STATUS.SUCCESS;
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
