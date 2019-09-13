import angular from 'angular';
import '@uirouter/angularjs';
import manualBackupComponent from './manual-backup.component';

const moduleName = 'enterpriseCloudDatabaseServiceDetailsBackupsManual';

angular
  .module(moduleName, [
    'ui.router',
  ])
  .config(/* @ngInject */($stateProvider) => {
    $stateProvider.state('enterprise-cloud-database.service.details.backups.manual', {
      url: '/manual-backup',
      views: {
        modal: {
          component: 'enterpriseCloudDatabaseServiceDetailsBackupsBackupComponent',
        },
      },
      layout: 'modal',
    });
  })
  .component('enterpriseCloudDatabaseServiceDetailsBackupsBackupComponent', manualBackupComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
