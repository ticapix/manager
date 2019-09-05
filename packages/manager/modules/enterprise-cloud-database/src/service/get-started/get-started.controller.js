import find from 'lodash/find';
import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';
import set from 'lodash/set';

export default class EnterpriseCloudDatabaseServiceGetStartedCtrl {
  /* @ngInject */
  constructor(
    $q,
    $translate,
    CucCloudMessage,
    CucControllerHelper,
    enterpriseCloudDatabaseService,
  ) {
    this.$q = $q;
    this.$translate = $translate;
    this.CucCloudMessage = CucCloudMessage;
    this.CucControllerHelper = CucControllerHelper;
    this.enterpriseCloudDatabaseService = enterpriseCloudDatabaseService;
  }

  $onInit() {
    this.stepperIndex = 0;
    this.data = {
      clusterName: this.clusterDetails.name,
      dailyBackup: false,
      replicaConfig: {
        replicaCount: 0,
        useDefaultPaymentMethod: true,
      },
    };
    this.loaders = {
      savingSecuritySettings: false,
      savingSettings: false,
    };

    this.subscribeToMessages();
  }

  dataChanged(data) {
    Object.assign(this.data, data);
  }

  getMaintenanceWindowConfig() {
    return (this.data.dayOfWeek && this.data.startTime && this.data.duration) ? {
      dayOfWeek: this.data.dayOfWeek,
      startTime: this.data.startTime,
      duration: this.data.duration,
    } : undefined;
  }

  getSecurityGroup(name) {
    const securityGroup = find(this.securityGroups, { name });
    return isUndefined(securityGroup)
      ? this.enterpriseCloudDatabaseService.createSecurityGroup(this.clusterDetails.id, name)
        .then(newSecurityGroup => newSecurityGroup.data)
      : this.$q.when(securityGroup);
  }

  gotoAddReplicas() {
    this.addReplicas(this.replicaConfigChanged.bind(this));
  }

  handleError(error) {
    this.CucCloudMessage.error(
      this.$translate.instant('enterprise_cloud_database_service_get_started_settings_save_error', {
        message: get(error, 'data.message'),
      }),
    );
    this.CucControllerHelper.scrollPageToTop();
  }

  refreshMessage() {
    this.messages = this.messageHandler.getMessages();
  }

  replicaConfigChanged(data) {
    this.dataChanged({ replicaConfig: data });
  }

  subscribeToMessages() {
    this.CucCloudMessage.unSubscribe('enterprise-cloud-database.service.get-started');
    this.messageHandler = this.CucCloudMessage.subscribe(
      'enterprise-cloud-database.service.get-started',
      { onMessage: () => this.refreshMessage() },
    );
  }

  saveSecurityInfo(form) {
    set(form, '$valid', false);
    this.CucCloudMessage.flushMessages('enterprise-cloud-database.service.get-started');
    this.loaders.savingSecuritySettings = true;
    return this.$q.all([
      this.enterpriseCloudDatabaseService.setClusterDetails(this.clusterDetails.id, {
        autoBackup: this.clusterDetails.autoBackup,
        name: this.data.clusterName,
      }),
      this.enterpriseCloudDatabaseService.setUserPassword(this.clusterDetails.id,
        this.data.clusterPassword),
      this.getSecurityGroup(this.data.securityGroupName)
        .then(securityGroup => this.enterpriseCloudDatabaseService
          .createRule(this.clusterDetails.id, securityGroup.id, this.data.rule)),
    ])
      .catch(error => this.handleError(error))
      .then(() => {
        this.stepperIndex += 1;
        set(form, '$valid', true);
      })
      .catch(error => this.handleError(error))
      .finally(() => {
        this.loaders.savingSecuritySettings = false;
      });
  }

  saveSettings(form) {
    // this.data.replicaConfig to be saved
    set(form, '$valid', false);
    this.CucCloudMessage.flushMessages('enterprise-cloud-database.service.get-started');
    this.loaders.savingSettings = true;
    const newMaintenanceWindow = this.getMaintenanceWindowConfig();
    return this.$q.all([
      this.enterpriseCloudDatabaseService.setClusterDetails(this.clusterDetails.id, {
        autoBackup: this.data.dailyBackup,
        name: this.data.clusterName,
      }),
      newMaintenanceWindow
        ? this.setupMaintenanceWindow(newMaintenanceWindow)
        : this.$q.when(0),
    ])
      .then(() => {
        this.stepperIndex += 1;
        set(form, '$valid', true);
        this.gotoClusterDetails();
      })
      .catch(error => this.handleError(error))
      .finally(() => {
        this.loaders.savingSettings = false;
      });
  }

  setupMaintenanceWindow(maintenanceWindow) {
    return (this.maintenanceWindow
      ? this.enterpriseCloudDatabaseService
        .updateMaintenanceWindow(this.clusterDetails.id, maintenanceWindow)
      : this.enterpriseCloudDatabaseService
        .createMaintenanceWindow(this.clusterDetails.id, maintenanceWindow));
  }
}
