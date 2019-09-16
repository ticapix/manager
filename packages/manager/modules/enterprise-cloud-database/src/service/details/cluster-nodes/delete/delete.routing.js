import { MESSAGE_CONTAINER } from '../../details.constants';

export default /* @ngInject */($stateProvider) => {
  $stateProvider.state('enterprise-cloud-database.service.details.cluster-nodes.delete', {
    layout: 'modal',
    resolve: {
      goBackToClusterSize: /* @ngInject */ ($state, CucCloudMessage) => (message = false, type = 'success') => {
        const reload = message && type === 'success';
        const promise = $state.go('enterprise-cloud-database.service.details.cluster-nodes', {}, { reload });
        if (message) {
          promise.then(() => {
            CucCloudMessage[type](message, MESSAGE_CONTAINER);
          });
        }
        return promise;
      },
    },
    translations: {
      value: ['.'],
      format: 'json',
    },
    url: '/delete',
    views: {
      modal: {
        component: 'ovhManagerEnterpriseCloudDatabaseServiceDetailsClusterSizeDeleteComponent',
      },
    },
  });
};
