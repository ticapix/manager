export default class EnterpriseCloudDatabaseServiceDetailsBackupsRecoveryCtrl {
  /* @ngInject */
  constructor(
    $state,
  ) {
    this.$state = $state;
  }

  cancel() {
    this.$state.go('^');
  }

  dataChange(defaultPaymentCheck) {
    this.defaultPaymentCheck = defaultPaymentCheck;
  }
}
