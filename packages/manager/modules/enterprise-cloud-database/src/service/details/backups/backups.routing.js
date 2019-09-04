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
      goBackToBackups: /* @ngInject */ ($state, CucCloudMessage) => (message = false, type = 'success') => {
        const reload = message && type === 'success';
        const state = 'enterprise-cloud-database.service.details.backups';
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
};
