import angular from 'angular';
import '@uirouter/angularjs';
import deleteComponent from './delete.component';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceDetailsClusterSizeDelete';

angular
  .module(moduleName, [
    'ui.router',
  ])
  .config(/* @ngInject */($stateProvider) => {
    $stateProvider.state('enterprise-cloud-database.service.details.cluster-size.delete', {
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
          const state = 'enterprise-cloud-database.service.details.cluster-size';
          const promise = $state.go(state, {}, { reload });
          if (message) {
            promise.then(() => {
              CucCloudMessage[type](message, state);
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
