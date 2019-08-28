import angular from 'angular';
import '@uirouter/angularjs';
import manualBackupComponent from './manual-backup.component';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceDetailsBackupsManual';

angular
  .module(moduleName, [
    'ui.router',
  ])
  .config(/* @ngInject */($stateProvider) => {
    $stateProvider.state('enterprise-cloud-database.service.details.backups.manual', {
      url: '/manual-backup',
      views: {
        modal: {
          component: 'manualBackupComponent',
        },
      },
      layout: 'modal',
    });
  })
  .component('manualBackupComponent', manualBackupComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
