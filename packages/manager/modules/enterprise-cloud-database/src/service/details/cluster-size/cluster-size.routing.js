export default /* @ngInject */($stateProvider) => {
  $stateProvider.state('enterprise-cloud-database.service.details.cluster-size', {
    component: 'enterpriseCloudDatabaseServiceDetailsClusterSizeComponent',
    resolve: {
      addReplicas: /* @ngInject */ ($state, clusterId, hosts) => callback => $state.go('enterprise-cloud-database.service.details.cluster-size.add-replicas', { clusterId, hostList: hosts, callback }),
      deleteReplicas: /* @ngInject */ ($state, clusterId) => () => $state.go('enterprise-cloud-database.service.details.cluster-size.delete', { clusterId }),
    },
    url: '/cluster-size',
  }).state('enterprise-cloud-database.service.details.cluster-size.add-replicas', {
    layout: 'modal',
    params: {
      clusterId: null,
      hostList: null,
      callback: null,
    },
    resolve: {
      callback: /* @ngInject */ $transition$ => $transition$.params().callback,
      goBack: /* @ngInject */ ($state, clusterId) => () => $state.go('enterprise-cloud-database.service.details.cluster-size', { clusterId }),
      hostList: /* @ngInject */ $transition$ => $transition$.params().hostList,
      maxHostCount: /* @ngInject */
        (clusterDetails, enterpriseCloudDatabaseService) => enterpriseCloudDatabaseService
          .getOfferDetails(clusterDetails.offerName)
          .then(offer => offer.maxHostCount),
    },
    url: '/add-replicas',
    views: {
      modal: {
        component: 'ovhManagerEnterpriseCloudDatabaseServiceAddReplicasComponent',
      },
    },
  });
};
