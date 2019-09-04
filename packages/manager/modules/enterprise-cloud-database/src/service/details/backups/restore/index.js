import angular from 'angular';
import '@uirouter/angularjs';
import restoreComponent from './restore.component';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceDetailsBackupsRestore';

angular
  .module(moduleName, [
    'ui.router',
  ])
  .config(/* @ngInject */($stateProvider) => {
    $stateProvider.state('enterprise-cloud-database.service.details.backups.restore', {
      url: '/restore',
      params: {
        backupInstance: null,
      },
      views: {
        modal: {
          component: 'restoreComponent',
        },
      },
      layout: 'modal',
      resolve: {
        backupInstance: /* @ngInject */ $transition$ => $transition$.params().backupInstance,
      },
    });
  })
  .component('restoreComponent', restoreComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
