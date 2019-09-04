import { ENTERPRISE_CLOUD_DATABASE_STATUS_MAP } from '../../../enterprise-cloud-database.constants';

export default class EnterpriseCloudDatabaseServiceDetailsBackupsCtrl {
  /* @ngInject */
  constructor(
    $state,
    CucCloudMessage,
    enterpriseCloudDatabaseService,
  ) {
    this.$state = $state;
    this.CucCloudMessage = CucCloudMessage;
    this.service = enterpriseCloudDatabaseService;
    this.ENTERPRISE_CLOUD_DATABASE_STATUS_MAP = ENTERPRISE_CLOUD_DATABASE_STATUS_MAP;
  }

  $onInit() {
    this.loadMessages();
    const firstBackupId = this.backupList[this.backupList.length - 1].id;
    this.getBackupDetails(firstBackupId).then((backup) => {
      this.minDate = backup.creationDate;
    });
  }

  loadMessages() {
    this.CucCloudMessage.unSubscribe('enterprise-cloud-database.service.details.restored-instances');
    this.messageHandler = this.CucCloudMessage.subscribe('enterprise-cloud-database', { onMessage: () => this.refreshMessages() });
  }

  refreshMessages() {
    this.messages = this.messageHandler.getMessages();
  }

  loadBackupDetails(backupId) {
    return this.service.getBackupDetails(this.clusterId, backupId);
  }

  manualBackup() {
    return this.$state.go('enterprise-cloud-database.service.details.backups.manual');
  }

  recovery() {
    return this.$state.go('enterprise-cloud-database.service.details.backups.recovery', { minDate: this.minDate });
  }

  restore(backupInstance) {
    return this.$state.go('enterprise-cloud-database.service.details.backups.restore', { backupInstance });
  }

  deleteBackup(backupInstance) {
    return this.$state.go('enterprise-cloud-database.service.details.backups.delete', { backupInstance });
  }
}
