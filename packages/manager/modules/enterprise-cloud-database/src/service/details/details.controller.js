export default class EnterpriseCloudDatabaseServiceDetailsCtrl {
  /* @ngInject */
  constructor(
    CucCloudMessage,
  ) {
    this.CucCloudMessage = CucCloudMessage;
  }

  $onInit() {
    this.subscribeToMessages();
  }

  refreshMessage() {
    this.messages = this.messageHandler.getMessages();
  }

  subscribeToMessages() {
    this.CucCloudMessage.unSubscribe('enterprise-cloud-database.service.details');
    this.messageHandler = this.CucCloudMessage.subscribe(
      'enterprise-cloud-database.service.details',
      { onMessage: () => this.refreshMessage() },
    );
  }
}
