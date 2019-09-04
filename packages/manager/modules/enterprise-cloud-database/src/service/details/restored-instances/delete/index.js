import angular from 'angular';
import '@uirouter/angularjs';
import deleteRestoredInstanceComponent from './delete.component';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceDetailsRestoredInstancesDelete';

angular
  .module(moduleName, [
    'ui.router',
  ])
  .config(/* @ngInject */($stateProvider) => {
    $stateProvider.state('enterprise-cloud-database.service.details.restored-instances.delete', {
      url: '/delete',
      params: {
        instanceId: null,
      },
      views: {
        modal: {
          component: 'deleteRestoredInstanceComponent',
        },
      },
      layout: 'modal',
      resolve: {
        instanceId: /* @ngInject */ $transition$ => $transition$.params().instanceId,
      },
    });
  })
  .component('deleteRestoredInstanceComponent', deleteRestoredInstanceComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
