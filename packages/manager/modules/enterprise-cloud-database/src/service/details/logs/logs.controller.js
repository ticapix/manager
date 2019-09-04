import { ENTERPRISE_CLOUD_DATABASE_STATUS_MAP } from '../../../enterprise-cloud-database.constants';

export default class EnterpriseCloudDatabaseServiceDetailsLogsCtrl {
  /* @ngInject */
  constructor(
    enterpriseCloudDatabaseService,
  ) {
    this.enterpriseCloudDatabaseService = enterpriseCloudDatabaseService;
  }

  $onInit() {
    this.ENTERPRISE_CLOUD_DATABASE_STATUS_MAP = ENTERPRISE_CLOUD_DATABASE_STATUS_MAP;
  }

  loadLogDetails(logId) {
    return this.enterpriseCloudDatabaseService.getLogDetails(this.clusterId, logId);
  }
}
