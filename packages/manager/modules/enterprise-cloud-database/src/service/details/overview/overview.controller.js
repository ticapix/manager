import { ENTERPRISE_CLOUD_DATABASE_STATUS_MAP } from '../../../enterprise-cloud-database.constants';
import { INCLUDED_CLUSTER_SIZE } from '../../service.constants';
import {
  AUTO_SNAPSHOT, SNAPSHOT_FREQUENCY, SNAPSHOT_RETENTION, MASKED_PASSWORD,
} from './overview.constants';

export default class EnterpriseCloudDatabaseServiceDetailsOverviewCtrl {
  /* @ngInject */
  constructor(
    $state,
    CucCloudMessage,
  ) {
    this.$state = $state;
    this.CucCloudMessage = CucCloudMessage;
    this.AUTO_SNAPSHOT = AUTO_SNAPSHOT;
    this.ENTERPRISE_CLOUD_DATABASE_STATUS_MAP = ENTERPRISE_CLOUD_DATABASE_STATUS_MAP;
    this.INCLUDED_CLUSTER_SIZE = INCLUDED_CLUSTER_SIZE;
    this.MASKED_PASSWORD = MASKED_PASSWORD;
    this.SNAPSHOT_FREQUENCY = SNAPSHOT_FREQUENCY;
    this.SNAPSHOT_RETENTION = SNAPSHOT_RETENTION;
  }

  $onInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.CucCloudMessage.unSubscribe('enterprise-cloud-database.service.details.overview');
    this.messageHandler = this.CucCloudMessage.subscribe('enterprise-cloud-database.service.details.overview', { onMessage: () => this.refreshMessages() });
  }

  refreshMessages() {
    this.messages = this.messageHandler.getMessages();
  }
}
