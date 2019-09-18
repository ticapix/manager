import get from 'lodash/get';

import { STATUS } from '../../../../enterprise-cloud-database.constants';

export default class EnterpriseCloudDatabaseServiceDetailsBackupsManualCtrl {
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

  dataChange(defaultPaymentCheck) {
    this.defaultPaymentCheck = defaultPaymentCheck;
  }

  cancel() {
    this.$state.go('^');
  }

  createBackup() {
    this.isLoading = true;
    return this.service.createBackup(this.clusterId, this.backupName)
      .then(res => this.goBackToBackups(
        this.$translate.instant('enterprise_cloud_database_backups_manual_backup_success',
          { name: this.backupName }),
        STATUS.SUCCESS,
        res.id,
      ))
      .catch(error => this.goBackToBackups(
        this.$translate.instant('enterprise_cloud_database_backups_recovery_error', {
          message: get(error, 'data.message'),
        }),
        STATUS.ERROR,
      ))
      .finally(() => { this.isLoading = false; });
  }
}
