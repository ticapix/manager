export default class EnterpriseCloudDatabaseServiceDetailsBackupsManualCtrl {
  /* @ngInject */
  constructor(
    $state,
  ) {
    this.$state = $state;
  }

  cancel() {
    this.$state.go('^');
  }
}
