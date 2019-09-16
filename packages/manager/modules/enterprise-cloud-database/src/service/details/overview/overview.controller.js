import {
  DATABASE_CONSTANTS, MASKED_PASSWORD,
} from '../../../enterprise-cloud-database.constants';
import {
  AUTO_BACKUP, BACKUP_FREQUENCY, BACKUP_RETENTION, USERNAME,
} from './overview.constants';
import { INCLUDED_CLUSTER_SIZE } from '../../service.constants';

export default class EnterpriseCloudDatabaseServiceDetailsOverviewCtrl {
  /* @ngInject */
  constructor(
    $state,
    CucCloudMessage,
    enterpriseCloudDatabaseService,
  ) {
    this.$state = $state;
    this.CucCloudMessage = CucCloudMessage;
    this.AUTO_BACKUP = AUTO_BACKUP;
    this.INCLUDED_CLUSTER_SIZE = INCLUDED_CLUSTER_SIZE;
    this.MASKED_PASSWORD = MASKED_PASSWORD;
    this.BACKUP_FREQUENCY = BACKUP_FREQUENCY;
    this.BACKUP_RETENTION = BACKUP_RETENTION;
    this.DATABASE_CONSTANTS = DATABASE_CONSTANTS;
    this.USERNAME = USERNAME;
    this.enterpriseCloudDatabaseService = enterpriseCloudDatabaseService;
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
