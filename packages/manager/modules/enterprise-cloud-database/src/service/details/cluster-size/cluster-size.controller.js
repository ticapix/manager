import { ENTERPRISE_CLOUD_DATABASE_STATUS_MAP } from '../../../enterprise-cloud-database.constants';
import { INCLUDED_CLUSTER_SIZE } from '../details.constants';

export default class EnterpriseCloudDatabaseServiceDetailsClusterSizeCtrl {
  /* @ngInject */
  constructor() {
    this.ENTERPRISE_CLOUD_DATABASE_STATUS_MAP = ENTERPRISE_CLOUD_DATABASE_STATUS_MAP;
    this.INCLUDED_CLUSTER_SIZE = INCLUDED_CLUSTER_SIZE;
  }

  $onInit() {
    this.includedClusterCount = INCLUDED_CLUSTER_SIZE.PRIMARY
    + INCLUDED_CLUSTER_SIZE.REPLICA + INCLUDED_CLUSTER_SIZE.BACKUP;
  }

  orderReplicas(data) {
    // Order replicas here
    return [this.includedClusterCount, data];
  }
}
