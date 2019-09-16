import { INCLUDED_CLUSTER_SIZE } from '../../service.constants';

export default class EnterpriseCloudDatabaseServiceDetailsClusterSizeCtrl {
  /* @ngInject */
  constructor(enterpriseCloudDatabaseService) {
    this.enterpriseCloudDatabaseService = enterpriseCloudDatabaseService;
    this.INCLUDED_CLUSTER_SIZE = INCLUDED_CLUSTER_SIZE;
  }

  $onInit() {
    this.includedClusterCount = INCLUDED_CLUSTER_SIZE.PRIMARY
    + INCLUDED_CLUSTER_SIZE.REPLICA + INCLUDED_CLUSTER_SIZE.BACKUP;
  }
}
