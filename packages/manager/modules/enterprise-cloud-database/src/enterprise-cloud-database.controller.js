import assign from 'lodash/assign';

import { DATABASE_CONSTANTS, GUIDELINK } from './enterprise-cloud-database.constants';

export default class EnterpriseCloudDatabaseCtrl {
  /* @ngInject */
  constructor(
    $q,
    CucCloudMessage,
    enterpriseCloudDatabaseService,
  ) {
    this.$q = $q;
    this.CucCloudMessage = CucCloudMessage;
    this.DATABASE_CONSTANTS = DATABASE_CONSTANTS;
    this.enterpriseCloudDatabaseService = enterpriseCloudDatabaseService;
    this.GUIDELINK = GUIDELINK;
  }

  $onInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.CucCloudMessage.unSubscribe('enterprise-cloud-database.list');
    this.messageHandler = this.CucCloudMessage.subscribe('enterprise-cloud-database', { onMessage: () => this.refreshMessages() });
  }

  refreshMessages() {
    this.messages = this.messageHandler.getMessages();
  }

  loadRow(cluster) {
    return this.$q.all([
      this.getClusterDetails(cluster.id),
      this.enterpriseCloudDatabaseService.getEndpointsWithDetails(cluster.id),
      this.enterpriseCloudDatabaseService.getUser(cluster.id),
    ]).then(res => assign({ endpoints: res[1], user: res[2] }, res[0]));
  }
}
