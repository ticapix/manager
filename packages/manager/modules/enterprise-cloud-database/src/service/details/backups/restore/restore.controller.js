import get from 'lodash/get';

export default class EnterpriseCloudDatabaseServiceDetailsBackupsRestoreCtrl {
  /* @ngInject */
  constructor(
    $state,
    $translate,
    enterpriseCloudDatabaseService,
  ) {
    this.$state = $state;
    this.$translate = $translate;
    this.service = enterpriseCloudDatabaseService;
  }

  cancel() {
    this.$state.go('^');
  }

  restoreInstance() {
    this.isLoading = true;
    this.service.restoreBackup(this.backupInstance.clusterId, this.backupInstance.id)
      .then(res => this.goBackToBackups(
        this.$translate.instant('enterprise_cloud_database_backups_restore_success',
          { name: this.backupInstance.name }),
        'success',
        res.id,
      ))
      .catch(error => this.goBackToBackups(
        this.$translate.instant('enterprise_cloud_database_backups_restore_error', {
          message: get(error, 'data.message'),
        }),
        'error',
      ))
      .finally(() => { this.isLoading = false; });
  }
}
