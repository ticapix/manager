import map from 'lodash/map';
import assign from 'lodash/assign';

export default /* @ngInject */($stateProvider) => {
  $stateProvider.state('enterprise-cloud-database.service.details.backups', {
    component: 'enterpriseCloudDatabaseServiceDetailsBackupsComponent',
    translations: {
      value: ['.'],
      format: 'json',
    },
    url: '/backups',
    resolve: {
      backupList: /* @ngInject */
        (clusterId, enterpriseCloudDatabaseService) => enterpriseCloudDatabaseService
          .getBackupList(clusterId).then(backups => map(backups, backup => assign(backup,
            { expiration: backup.creationDate }))),
    },
  });
};
