import reduce from 'lodash/reduce';

export default class EnterpriseCloudDatabaseServiceDetailsCtrl {
  /* @ngInject */
  constructor(CucCloudMessage) {
    this.CucCloudMessage = CucCloudMessage;
  }

  $onInit() {
    this.loadMessages();
    this.rulesCount = reduce(this.securityGroups,
      (rulesCount, securityGroup) => rulesCount + securityGroup.rulesCount, 0);
  }

  refreshMessage() {
    this.messages = this.messageHandler.getMessages();
  }

  loadMessages() {
    this.CucCloudMessage.unSubscribe('enterprise-cloud-database.service.details');
    this.messageHandler = this.CucCloudMessage.subscribe(
      'enterprise-cloud-database.service.details',
      { onMessage: () => this.refreshMessage() },
    );
  }
}
