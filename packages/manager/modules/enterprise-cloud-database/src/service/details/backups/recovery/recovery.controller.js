import get from 'lodash/get';
import moment from 'moment';

export default class EnterpriseCloudDatabaseServiceDetailsBackupsRecoveryCtrl {
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

  $onInit() {
    this.maxDate = moment().toDate();
    this.minDate = moment(this.minDate).toDate();
  }

  cancel() {
    this.$state.go('^');
  }

  dataChange(defaultPaymentCheck) {
    this.defaultPaymentCheck = defaultPaymentCheck;
  }

  restoreBackup() {
    this.isLoading = true;
    this.timestamp = moment(`${this.selectedDate} ${this.timePicker}`).format();
    return this.service.createRestore(this.clusterId, null, this.timestamp)
      .then(res => this.goBackToBackups(
        this.$translate.instant('enterprise_cloud_database_backups_recovery_success'),
        'success',
        res.id,
      ))
      .catch(error => this.goBackToBackups(
        this.$translate.instant('enterprise_cloud_database_backups_recovery_error', {
          message: get(error, 'data.message'),
        }),
        'error',
      ))
      .finally(() => { this.isLoading = false; });
  }
}
