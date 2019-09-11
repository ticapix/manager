import each from 'lodash/each';
import find from 'lodash/find';
import get from 'lodash/get';
import set from 'lodash/set';

import { MESSAGE_CONTAINER } from '../details.constants';

export default /* @ngInject */($stateProvider) => {
  $stateProvider.state('enterprise-cloud-database.service.details.cluster-nodes', {
    cache: false,
    component: 'enterpriseCloudDatabaseServiceDetailsClusterSizeComponent',
    resolve: {
      addReplicas: /* @ngInject */ ($state, clusterId, hosts) => () => $state.go('enterprise-cloud-database.service.details.cluster-nodes.add-replicas', {
        clusterId, hostList: hosts, createReplicas: true,
      }),
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
      createReplicas: null,
      hostList: null,
    },
    resolve: {
      createReplicas: /* @ngInject */ $transition$ => $transition$.params().createReplicas,
      goBack: /* @ngInject */ ($state, clusterId, CucCloudMessage) => (message = false, type = 'success') => {
        const reload = message && type === 'success';
        const promise = $state.go('enterprise-cloud-database.service.details.cluster-nodes', {
          clusterId,
        },
        {
          reload,
        });
        if (message) {
          promise.then(() => {
            CucCloudMessage[type](message, MESSAGE_CONTAINER);
          });
        }
        return promise;
      },
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
