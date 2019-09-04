import angular from 'angular';

import deleteComponent from './delete';
import enterpriseCloudDatabaseServiceDetailsBackupsComponent from './backups.component';
import manualBackup from './manual-backup';
import routing from './backups.routing';
import recovery from './recovery';
import restore from './restore';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceDetailsBackups';

angular
  .module(moduleName, [deleteComponent, manualBackup, recovery, restore])
  .config(routing)
  .component('enterpriseCloudDatabaseServiceDetailsBackupsComponent', enterpriseCloudDatabaseServiceDetailsBackupsComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
