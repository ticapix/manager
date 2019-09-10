import each from 'lodash/each';
import find from 'lodash/find';
import get from 'lodash/get';
import set from 'lodash/set';

export default /* @ngInject */($stateProvider) => {
  $stateProvider.state('enterprise-cloud-database.service.details.cluster-nodes', {
    component: 'enterpriseCloudDatabaseServiceDetailsClusterSizeComponent',
    resolve: {
      addReplicas: /* @ngInject */ ($state, clusterId, hosts) => callback => $state.go('enterprise-cloud-database.service.details.cluster-nodes.add-replicas', { clusterId, hostList: hosts, callback }),
      deleteReplicas: /* @ngInject */ ($state, clusterId) => () => $state.go('enterprise-cloud-database.service.details.cluster-nodes.delete', { clusterId }),
      hosts: /* @ngInject */
        (clusterId, enterpriseCloudDatabaseService, planCatalog) => enterpriseCloudDatabaseService
          .getHostsWithDetails(clusterId)
          .then(hosts => each(hosts, (host) => {
            set(host, 'ram', `${get(planCatalog, 'memory.size', 0)} GB`);
            set(host, 'storage', `${get(planCatalog, 'storage.size')} GB X ${get(planCatalog, 'storage.count', 0)} ${get(planCatalog, 'storage.type')} RAID ${get(planCatalog, 'storage.raid.level')} disk(s)`);
          })),
      planCatalog: /* @ngInject */
        (capabilities, clusterDetails) => find(capabilities, { name: clusterDetails.offerName }),
    },
    translations: {
      value: ['.'],
      format: 'json',
    },
    url: '/cluster-nodes',
  }).state('enterprise-cloud-database.service.details.cluster-nodes.add-replicas', {
    layout: 'modal',
    params: {
      clusterId: null,
      hostList: null,
      callback: null,
    },
    resolve: {
      callback: /* @ngInject */ $transition$ => $transition$.params().callback,
      goBack: /* @ngInject */ ($state, clusterId) => () => $state.go('enterprise-cloud-database.service.details.cluster-nodes', { clusterId }),
      hostList: /* @ngInject */ $transition$ => $transition$.params().hostList,
      maxHostCount: /* @ngInject */
        (clusterDetails, enterpriseCloudDatabaseService) => enterpriseCloudDatabaseService
          .getOfferDetails(clusterDetails.offerName)
          .then(offer => offer.maxHostCount),
      nodeCatalog: /* @ngInject */
        planCatalog => planCatalog.node,
    },
    translations: {
      value: ['.'],
      format: 'json',
    },
    url: '/add-replicas',
    views: {
      modal: {
        component: 'ovhManagerEnterpriseCloudDatabaseServiceAddReplicasComponent',
      },
    },
  });
};
