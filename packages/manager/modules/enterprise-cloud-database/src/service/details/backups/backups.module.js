import angular from 'angular';

import enterpriseCloudDatabaseServiceDetailsBackupsComponent from './backups.component';
import routing from './backups.routing';
import manualBackup from './manual-backup';
import recovery from './recovery';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceDetailsBackups';

angular
  .module(moduleName, [manualBackup, recovery])
  .config(routing)
  .component('enterpriseCloudDatabaseServiceDetailsBackupsComponent', enterpriseCloudDatabaseServiceDetailsBackupsComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
