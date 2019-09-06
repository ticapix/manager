import { ENTERPRISE_CLOUD_DATABASE_STATUS_MAP } from '../../../enterprise-cloud-database.constants';
import { INCLUDED_CLUSTER_SIZE } from '../../service.constants';
import {
  AUTO_BACKUP, BACKUP_FREQUENCY, BACKUP_RETENTION, MASKED_PASSWORD, USERNAME,
} from './overview.constants';

export default class EnterpriseCloudDatabaseServiceDetailsOverviewCtrl {
  /* @ngInject */
  constructor(
    $state,
    CucCloudMessage,
  ) {
    this.$state = $state;
    this.CucCloudMessage = CucCloudMessage;
    this.AUTO_BACKUP = AUTO_BACKUP;
    this.ENTERPRISE_CLOUD_DATABASE_STATUS_MAP = ENTERPRISE_CLOUD_DATABASE_STATUS_MAP;
    this.INCLUDED_CLUSTER_SIZE = INCLUDED_CLUSTER_SIZE;
    this.MASKED_PASSWORD = MASKED_PASSWORD;
    this.BACKUP_FREQUENCY = BACKUP_FREQUENCY;
    this.BACKUP_RETENTION = BACKUP_RETENTION;
    this.USERNAME = USERNAME;
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
