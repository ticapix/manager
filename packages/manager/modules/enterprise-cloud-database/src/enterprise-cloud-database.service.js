import map from 'lodash/map';

import { ERROR_STATUS, PROCESSING_STATUS } from './enterprise-cloud-database.constants';

export default class EnterpriseCloudDatabaseService {
  /* @ngInject */
  constructor($q, mockData, OvhApiCloudDBEnterprise) {
    this.$q = $q;
    this.mockData = mockData;
    this.OvhApiCloudDBEnterpriseCluster = OvhApiCloudDBEnterprise.v6();
    this.OvhApiCloudDBEnterpriseBackup = OvhApiCloudDBEnterprise.Backup().v6();
    this.OvhApiCloudDBEnterpriseEndpoint = OvhApiCloudDBEnterprise.Endpoint().v6();
    this.OvhApiCloudDBEnterpriseHost = OvhApiCloudDBEnterprise.Host().v6();
    this.OvhApiCloudDBEnterpriseLogs = OvhApiCloudDBEnterprise.Logs().v6();
    this.OvhApiCloudDBEnterpriseMaintenance = OvhApiCloudDBEnterprise.Maintenance().v6();
    this.OvhApiCloudDBEnterpriseWindow = OvhApiCloudDBEnterprise.MaintenanceWindow().v6();
    this.OvhApiCloudDBEnterpriseRestore = OvhApiCloudDBEnterprise.Restore().v6();
    this.OvhApiCloudDBEnterpriseRule = OvhApiCloudDBEnterprise.SecurityGroup().Rule().v6();
    this.OvhApiCloudDBEnterpriseSecurityGroup = OvhApiCloudDBEnterprise.SecurityGroup().v6();
    this.OvhApiCloudDBEnterpriseServiceInfos = OvhApiCloudDBEnterprise.ServiceInfos().v6();
    this.OvhApiCloudDBEnterpriseUser = OvhApiCloudDBEnterprise.User().v6();
  }

  createMaintenanceWindow(clusterId, windowData) {
    return this.OvhApiCloudDBEnterpriseWindow.create({ clusterId }, windowData).$promise;
  }

  createRule(clusterId, securityGroupId, source) {
    return this.OvhApiCloudDBEnterpriseRule.create({ clusterId, securityGroupId },
      { source }).$promise;
  }

  createSecurityGroup(clusterId, name) {
    return this.OvhApiCloudDBEnterpriseSecurityGroup.create({ clusterId },
      { clusterId, name }).$promise;
  }

  deleteRule(clusterId, securityGroupId, ruleId) {
    return this.OvhApiCloudDBEnterpriseRule
      .delete({ clusterId, securityGroupId, ruleId }).$promise;
  }

  deleteSecurityGroup(clusterId, securityGroupId) {
    return this.OvhApiCloudDBEnterpriseSecurityGroup
      .delete({ clusterId, securityGroupId }).$promise;
  }

  getCapabilities() {
    return this.mockData.getCapabilities();
  }

  getClusterDetails(clusterId) {
    return this.OvhApiCloudDBEnterpriseCluster.get({ clusterId }).$promise.then((response) => {
      delete response.$promise; return response;
    });
  }

  getClusterList() {
    return this.getClusters()
      .then(clusters => this.$q.all(map(clusters, clusterId => this.getClusterDetails(clusterId))));
  }

  getClusters() {
    return this.OvhApiCloudDBEnterpriseCluster.query().$promise;
  }

  getEndpointDetails(clusterId, endpointId) {
    return this.OvhApiCloudDBEnterpriseEndpoint.get({ clusterId, endpointId }).$promise;
  }

  getEndpoints(clusterId) {
    return this.OvhApiCloudDBEnterpriseEndpoint.query({ clusterId }).$promise;
  }

  getEndpointsWithDetails(clusterId) {
    return this.getEndpoints(clusterId)
      .then(endpoints => this.$q.all(
        map(endpoints, endpointId => this.getEndpointDetails(clusterId, endpointId)),
      ));
  }

  getHostDetails(clusterId, hostId) {
    return this.OvhApiCloudDBEnterpriseHost.get({ clusterId, hostId }).$promise;
  }

  getHosts(clusterId) {
    return this.OvhApiCloudDBEnterpriseHost.query({ clusterId }).$promise;
  }

  getMaintenanceWindow(clusterId) {
    return this.OvhApiCloudDBEnterpriseWindow.get({ clusterId }).$promise;
  }

  getRuleDetails(clusterId, securityGroupId, ruleId) {
    return this.OvhApiCloudDBEnterpriseRule.get({ clusterId, securityGroupId, ruleId }).$promise;
  }

  getRulesList(clusterId, securityGroupId) {
    return this.getRules(clusterId, securityGroupId)
      .then(rules => this.$q.all(map(rules,
        ruleId => this.getRuleDetails(clusterId, securityGroupId, ruleId))));
  }

  getRules(clusterId, securityGroupId) {
    return this.OvhApiCloudDBEnterpriseRule.query({ clusterId, securityGroupId }).$promise;
  }

  getSecurityGroupDetails(clusterId, securityGroupId) {
    return this.OvhApiCloudDBEnterpriseSecurityGroup.get({ clusterId, securityGroupId }).$promise;
  }

  getSecurityGroupList(clusterId) {
    return this.getSecurityGroups(clusterId)
      .then(securityGroups => this.$q.all(map(securityGroups,
        securityGroupId => this.getSecurityGroupDetails(clusterId, securityGroupId))));
  }

  getSecurityGroups(clusterId) {
    return this.OvhApiCloudDBEnterpriseSecurityGroup.query({ clusterId }).$promise;
  }

  getServiceInfo(clusterId) {
    return this.OvhApiCloudDBEnterpriseServiceInfos.get({ clusterId }).$promise;
  }

  setClusterDetails(clusterId, clusterDetails) {
    return this.OvhApiCloudDBEnterpriseCluster.update({ clusterId }, clusterDetails).$promise;
  }

  setUserPassword(clusterId, password) {
    return this.OvhApiCloudDBEnterpriseUser.create({ clusterId }, { password }).$promise;
  }

  updateMaintenanceWindow(clusterId, windowData) {
    return this.OvhApiCloudDBEnterpriseWindow.update({ clusterId }, windowData).$promise;
  }

  getRestores(clusterId) {
    return this.OvhApiCloudDBEnterpriseRestore.query({ clusterId }).$promise;
  }

  getRestoreDetails(clusterId, restoreId) {
    return this.OvhApiCloudDBEnterpriseRestore.get({ clusterId, restoreId }).$promise;
  }

  getRestoreList(clusterId) {
    return this.getRestores(clusterId)
      .then(restores => this.$q.all(
        map(restores, restoreId => this.getRestoreDetails(clusterId, restoreId)),
      ));
  }

  getBackups(clusterId) {
    return this.OvhApiCloudDBEnterpriseBackup.query({ clusterId }).$promise;
  }

  getBackupDetails(clusterId, backupId) {
    return this.OvhApiCloudDBEnterpriseBackup.get({ clusterId, backupId }).$promise;
  }

  getBackupList(clusterId) {
    return this.getBackups(clusterId)
      .then(backups => this.$q.all(
        map(backups, backupId => this.getBackupDetails(clusterId, backupId)),
      ));
  }

  deleteRestoredInstance(clusterId, restoredInstanceId) {
    return this.OvhApiCloudDBEnterpriseRestore.delete(
      { clusterId, restoreId: restoredInstanceId },
    ).$promise;
  }

  resetSecurityGroupDetailsCache() {
    this.OvhApiCloudDBEnterpriseSecurityGroup.resetCache();
  }

  updateSecurityGroup(clusterId, securityGroupId, name) {
    return this.OvhApiCloudDBEnterpriseSecurityGroup.update(
      { clusterId, securityGroupId },
      { name },
    ).$promise;
  }

  static isProcessing(status) {
    return PROCESSING_STATUS.includes(status);
  }

  static isError(status) {
    return ERROR_STATUS.includes(status);
  }
}
