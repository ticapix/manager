export default class EnterpriseCloudDatabaseServiceDetailsBackupsCtrl {
  /* @ngInject */
  constructor(
    $state,
    CucCloudMessage,
  ) {
    this.$state = $state;
    this.CucCloudMessage = CucCloudMessage;
  }

  $onInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.CucCloudMessage.unSubscribe('enterprise-cloud-database.service.details.restored-instances');
    this.messageHandler = this.CucCloudMessage.subscribe('enterprise-cloud-database', { onMessage: () => this.refreshMessages() });
  }

  refreshMessages() {
    this.messages = this.messageHandler.getMessages();
  }

  manualBackup() {
    return this.$state.go('enterprise-cloud-database.service.details.backups.manual');
  }

  recovery() {
    return this.$state.go('enterprise-cloud-database.service.details.backups.recovery');
  }

  restore(backupInstance) {
    return this.$state.go('enterprise-cloud-database.service.details.backups.restore', { backupInstance });
  }

  deleteBackup(backupInstance) {
    return this.$state.go('enterprise-cloud-database.service.details.backups.delete', { backupInstance });
  }
}
