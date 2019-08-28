import { DELETE_CONFIRMATION_INPUT } from '../enterprise-cloud-database.constants';

export default class EnterpriseCloudDatabaseDeleteCtrl {
  /* @ngInject */
  constructor(
    $stateParams,
    $translate,
    enterpriseCloudDatabaseService,
  ) {
    this.projectId = $stateParams.projectId;
    this.clusterId = $stateParams.clusterId;
    this.clusterName = $stateParams.clusterName;
    this.$translate = $translate;
    this.DELETE_CONFIRMATION_INPUT = DELETE_CONFIRMATION_INPUT;
    this.enterpriseCloudDatabaseService = enterpriseCloudDatabaseService;
    this.isLoading = false;
  }

  $onInit() {
  }

  deleteCluster() {
    this.isLoading = true;
  }
}
