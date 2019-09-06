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
          .getHosts(clusterId),
      serviceInfo: /* @ngInject */
        (clusterId, enterpriseCloudDatabaseService) => enterpriseCloudDatabaseService
          .getServiceInfo(clusterId),
      goToOverview: /* @ngInject */ ($state, CucCloudMessage) => (message = false, type = 'success') => {
        const state = 'enterprise-cloud-database.service.details.overview';
        const promise = $state.go(state, {});
        if (message) {
          promise.then(() => {
            CucCloudMessage[type](message, state);
          });
        }
        return promise;
      },
      offerDetails: /* @ngInject */
        (clusterDetails, enterpriseCloudDatabaseService) => enterpriseCloudDatabaseService
          .getOfferDetails(clusterDetails.offerName),
      goToUpdatePassword: /* @ngInject */ ($state, clusterId) => () => $state
        .go('enterprise-cloud-database.service.details.overview.update-password', { clusterId }),
      goToSettings: /* @ngInject */ ($state, clusterId) => () => $state
        .go('enterprise-cloud-database.service.details.settings', { clusterId }),
      goToClusterSize: /* @ngInject */ ($state, clusterId) => () => $state
        .go('enterprise-cloud-database.service.details.cluster-nodes', { clusterId }),
    },
  });
};
