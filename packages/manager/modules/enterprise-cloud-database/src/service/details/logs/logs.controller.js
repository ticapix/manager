export default class EnterpriseCloudDatabaseServiceDetailsLogsCtrl {
  /* @ngInject */
  constructor(
    enterpriseCloudDatabaseService,
  ) {
    this.enterpriseCloudDatabaseService = enterpriseCloudDatabaseService;
  }

  loadLogDetails(logId) {
    return this.enterpriseCloudDatabaseService.getLogDetails(this.clusterId, logId);
  }
}
