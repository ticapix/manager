import { DELETE_CONFIRMATION_INPUT_PATTERN } from '../enterprise-cloud-database.constants';

export default class EnterpriseCloudDatabaseDeleteCtrl {
  /* @ngInject */
  constructor(
    $translate,
    enterpriseCloudDatabaseService,
  ) {
    this.$translate = $translate;
    this.DELETE_CONFIRMATION_INPUT_PATTERN = DELETE_CONFIRMATION_INPUT_PATTERN;
    this.enterpriseCloudDatabaseService = enterpriseCloudDatabaseService;
    this.isLoading = false;
  }

  deleteCluster() {
    this.isLoading = true;
  }
}
