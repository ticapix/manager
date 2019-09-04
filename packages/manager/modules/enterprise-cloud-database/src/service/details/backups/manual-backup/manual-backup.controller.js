export default class EnterpriseCloudDatabaseServiceDetailsBackupsManualCtrl {
  /* @ngInject */
  constructor(
    $state,
  ) {
    this.$state = $state;
  }

  dataChange(defaultPaymentCheck) {
    this.defaultPaymentCheck = defaultPaymentCheck;
  }

  cancel() {
    this.$state.go('^');
  }
}
