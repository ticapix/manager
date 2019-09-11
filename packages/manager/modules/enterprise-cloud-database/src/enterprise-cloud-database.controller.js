import assign from 'lodash/assign';

import { ENTERPRISE_CLOUD_DATABASE_STATUS_MAP, DATABASE_CONSTANTS } from './enterprise-cloud-database.constants';

export default class EnterpriseCloudDatabaseCtrl {
  /* @ngInject */
  constructor(
    $q,
    $scope,
    $state,
    CucCloudMessage,
    enterpriseCloudDatabaseService,
  ) {
    this.$q = $q;
    this.$scope = $scope;
    this.$state = $state;
    this.CucCloudMessage = CucCloudMessage;
    this.ENTERPRISE_CLOUD_DATABASE_STATUS_MAP = ENTERPRISE_CLOUD_DATABASE_STATUS_MAP;
    this.DATABASE_CONSTANTS = DATABASE_CONSTANTS;
    this.enterpriseCloudDatabaseService = enterpriseCloudDatabaseService;
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
    ]).then(res => assign({ endpoints: res[1] }, res[0]));
  }

  gettingStarted(clusterId) {
    this.$state.go('enterprise-cloud-database.service.get-started', { clusterId });
  }

  createCluster() {
    this.$state.go('enterprise-cloud-database.create');
  }

  delete(clusterId, clusterName) {
    const promise = this.$state.go('enterprise-cloud-database.delete', {
      projectId: 'projectId',
      clusterId,
      clusterName,
    });
    return promise;
  }
}
