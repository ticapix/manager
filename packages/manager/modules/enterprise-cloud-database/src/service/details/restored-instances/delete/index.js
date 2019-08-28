import angular from 'angular';
import '@uirouter/angularjs';
import deleteBackupComponent from './delete.component';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceDetailsRestoredInstancesDelete';

angular
  .module(moduleName, [
    'ui.router',
  ])
  .config(/* @ngInject */($stateProvider) => {
    $stateProvider.state('enterprise-cloud-database.service.details.restored-instances.delete', {
      url: '/delete?instanceId',
      params: {
        instanceId: null,
      },
      views: {
        modal: {
          component: 'deleteBackupComponent',
        },
      },
      layout: 'modal',
    });
  })
  .component('deleteBackupComponent', deleteBackupComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
