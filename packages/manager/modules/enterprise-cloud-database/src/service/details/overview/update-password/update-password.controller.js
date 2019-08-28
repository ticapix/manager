export default class EnterpriseCloudDatabaseServiceDetailsOverviewUpdatePasswordCtrl {
  /* @ngInject */
  constructor(
    $state,
  ) {
    this.$state = $state;
  }

  cancel() {
    this.$state.go('^');
  }

  dataChange(password) {
    this.password = password;
  }
}
