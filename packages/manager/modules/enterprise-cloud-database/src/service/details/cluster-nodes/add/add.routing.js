import { MESSAGE_CONTAINER } from '../../details.constants';
import { STATUS } from '../../../../enterprise-cloud-database.constants';

export default /* @ngInject */($stateProvider) => {
  $stateProvider.state('enterprise-cloud-database.service.details.cluster-nodes.add', {
    layout: 'modal',
    params: {
      createReplicas: null,
      hostList: null,
    },
    resolve: {
      createReplicas: /* @ngInject */ $transition$ => $transition$.params().createReplicas,
      goBack: /* @ngInject */ ($state, clusterId, CucCloudMessage) => (message = false,
        type = STATUS.SUCCESS) => {
        const reload = message && type === STATUS.SUCCESS;
        const promise = $state.go('enterprise-cloud-database.service.details.cluster-nodes', { clusterId }, { reload });
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
      value: ['../../../add-replicas'],
      format: 'json',
    },
    url: '/add',
    views: {
      modal: {
        component: 'ovhManagerEnterpriseCloudDatabaseServiceAddReplicasComponent',
      },
    },
  });
};
