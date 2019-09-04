import angular from 'angular';
import '@uirouter/angularjs';
import deleteComponent from './delete.component';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceDetailsBackupsDelete';

angular
  .module(moduleName, [
    'ui.router',
  ])
  .config(/* @ngInject */($stateProvider) => {
    $stateProvider.state('enterprise-cloud-database.service.details.backups.delete', {
      url: '/delete',
      params: {
        backupInstance: null,
      },
      views: {
        modal: {
          component: 'ovhManagerEnterpriseCloudDatabaseServiceDetailsBackupsDeleteComponent',
        },
      },
      layout: 'modal',
      resolve: {
        backupInstance: /* @ngInject */ $transition$ => $transition$.params().backupInstance,
      },
    });
  })
  .component('ovhManagerEnterpriseCloudDatabaseServiceDetailsBackupsDeleteComponent', deleteComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
