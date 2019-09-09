import each from 'lodash/each';
import find from 'lodash/find';
import head from 'lodash/head';
import get from 'lodash/get';
import set from 'lodash/set';
import toUpper from 'lodash/toUpper';

export default /* @ngInject */($stateProvider) => {
  $stateProvider.state('enterprise-cloud-database.service.details.cluster-nodes', {
    component: 'enterpriseCloudDatabaseServiceDetailsClusterSizeComponent',
    resolve: {
      addReplicas: /* @ngInject */ ($state, clusterId, hosts) => callback => $state.go('enterprise-cloud-database.service.details.cluster-nodes.add-replicas', { clusterId, hostList: hosts, callback }),
      catalog: /* @ngInject */
        enterpriseCloudDatabaseService => enterpriseCloudDatabaseService.getOfferCatalog(),
      deleteReplicas: /* @ngInject */ ($state, clusterId) => () => $state.go('enterprise-cloud-database.service.details.cluster-nodes.delete', { clusterId }),
      hosts: /* @ngInject */
        (clusterId, enterpriseCloudDatabaseService, planCatalog) => enterpriseCloudDatabaseService
          .getHostsWithDetails(clusterId)
          .then(hosts => each(hosts, (host) => {
            const storage = get(planCatalog, 'blobs.technical.storage');
            const disk = head(storage.disks);
            set(host, 'ram', `${get(planCatalog, 'blobs.technical.memory.size', 0)} GB`);
            set(host, 'storage', `${disk.capacity} GB X ${storage.disks.length} ${toUpper(disk.technology)} RAID ${storage.raid} disk(s)`);
          })),
      planCatalog: /* @ngInject */
        (catalog, clusterDetails) => find(catalog.plans, { planCode: clusterDetails.offerName }),
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
      currency: /* @ngInject */
        enterpriseCloudDatabaseService => enterpriseCloudDatabaseService.getMe()
          .then(me => get(me, 'currency.symbol')),
      goBack: /* @ngInject */ ($state, clusterId) => () => $state.go('enterprise-cloud-database.service.details.cluster-nodes', { clusterId }),
      hostList: /* @ngInject */ $transition$ => $transition$.params().hostList,
      maxHostCount: /* @ngInject */
        (clusterDetails, enterpriseCloudDatabaseService) => enterpriseCloudDatabaseService
          .getOfferDetails(clusterDetails.offerName)
          .then(offer => offer.maxHostCount),
      nodeCatalog: /* @ngInject */
        (catalog, planCatalog) => {
          const nodePlan = get(find(planCatalog.addonFamilies, { name: 'node' }), 'addons[0]');
          return find(catalog.addons, { planCode: nodePlan });
        },
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
