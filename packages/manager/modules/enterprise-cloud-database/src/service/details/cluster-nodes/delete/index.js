import angular from 'angular';
import '@uirouter/angularjs';
import { MESSAGE_CONTAINER } from '../../details.constants';
import deleteComponent from './delete.component';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceDetailsClusterSizeDelete';

angular
  .module(moduleName, [
    'ui.router',
  ])
  .config(/* @ngInject */($stateProvider) => {
    $stateProvider.state('enterprise-cloud-database.service.details.cluster-nodes.delete', {
      url: '/delete',
      views: {
        modal: {
          component: 'ovhManagerEnterpriseCloudDatabaseServiceDetailsClusterSizeDeleteComponent',
        },
      },
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
    });
  })
  .component('ovhManagerEnterpriseCloudDatabaseServiceDetailsClusterSizeDeleteComponent', deleteComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
