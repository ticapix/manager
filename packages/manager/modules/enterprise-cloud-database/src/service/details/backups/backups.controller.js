import assign from 'lodash/assign';
import moment from 'moment';


export default class EnterpriseCloudDatabaseServiceDetailsBackupsCtrl {
  /* @ngInject */
  constructor(
    CucCloudMessage,
    enterpriseCloudDatabaseService,
  ) {
    this.CucCloudMessage = CucCloudMessage;
    this.service = enterpriseCloudDatabaseService;
  }

  $onInit() {
    this.loadMessages();
    const firstBackupId = this.backupList[this.backupList.length - 1].id;
    this.getBackupDetails(firstBackupId).then((backup) => {
      this.minDate = backup.creationDate;
    });
    console.log(this.catalog);
    console.log(this.backupPrice);
  }

  loadMessages() {
    this.CucCloudMessage.unSubscribe('enterprise-cloud-database.service.details.restored-instances');
    this.messageHandler = this.CucCloudMessage.subscribe('enterprise-cloud-database', { onMessage: () => this.refreshMessages() });
  }

  refreshMessages() {
    this.messages = this.messageHandler.getMessages();
  }

  loadBackupDetails(backupId) {
    return this.service.getBackupDetails(this.clusterDetails.id, backupId)
      .then(backup => assign(backup, { expirationDate: moment(backup.creationDate).add(90, 'days').format() }));
  }
}
