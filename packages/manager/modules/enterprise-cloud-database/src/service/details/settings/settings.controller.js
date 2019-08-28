import get from 'lodash/get';
import keys from 'lodash/keys';
import reduce from 'lodash/reduce';

import { MESSAGE_CONTAINER } from '../details.constants';

export default class EnterpriseCloudDatabaseServiceDetailsSettingsCtrl {
  /* @ngInject */
  constructor(
    $translate,
    CucCloudMessage,
    enterpriseCloudDatabaseService,
  ) {
    this.$translate = $translate;
    this.CucCloudMessage = CucCloudMessage;
    this.enterpriseCloudDatabaseService = enterpriseCloudDatabaseService;
  }

  $onInit() {
    this.data = {
      autoBackup: this.clusterDetails.autoBackup,
      maintenanceWindow: {},
    };
    this.loaders = {
      autoBackup: false,
      maintenanceWindow: false,
    };
  }

  getMaintenanceWindowConfig() {
    return (this.data.dayOfWeek && this.data.startTime && this.data.duration) ? {
      dayOfWeek: this.data.dayOfWeek,
      startTime: this.data.startTime,
      duration: this.data.duration,
    } : undefined;
  }

  handleError(error) {
    this.CucCloudMessage.error(
      this.$translate.instant('enterprise_cloud_database_service_details_settings_save_error', {
        message: get(error, 'data.message'),
      }),
      MESSAGE_CONTAINER,
    );
  }

  handleSuccess() {
    this.CucCloudMessage.success(
      this.$translate.instant('enterprise_cloud_database_service_details_settings_save_success'),
      MESSAGE_CONTAINER,
    );
  }

  hasMaintenanceWindowChanged() {
    const maintenanceWindowConfig = this.getMaintenanceWindowConfig();
    if (!this.maintenanceWindow && maintenanceWindowConfig) {
      return true;
    }
    return maintenanceWindowConfig
      ? reduce(keys(maintenanceWindowConfig),
        (windowChanged, configKey) => windowChanged || (get(maintenanceWindowConfig, configKey)
          !== get(this.maintenanceWindow, configKey)), false)
      : false;
  }

  maintenanceWindowChanged(data) {
    Object.assign(this.data, data);
  }

  saveAutoBackup(autoBackup) {
    this.CucCloudMessage.flushMessages(MESSAGE_CONTAINER);
    this.loaders.autoBackup = true;
    this.enterpriseCloudDatabaseService.setClusterDetails(this.clusterDetails.id, {
      autoBackup,
      name: this.data.clusterName,
    }).then(() => this.handleSuccess())
      .catch(error => this.handleError(error))
      .finally(() => { this.loaders.autoBackup = false; });
  }

  saveMaintenanceWindow() {
    this.CucCloudMessage.flushMessages(MESSAGE_CONTAINER);
    this.loaders.maintenanceWindow = true;
    const maintenanceWindowConfig = this.getMaintenanceWindowConfig();
    this.setupMaintenanceWindow(maintenanceWindowConfig)
      .then(() => {
        Object.assign(this.maintenanceWindow, maintenanceWindowConfig);
        this.handleSuccess();
      })
      .catch(error => this.handleError(error))
      .finally(() => { this.loaders.maintenanceWindow = false; });
  }

  setupMaintenanceWindow(maintenanceWindow) {
    return (this.maintenanceWindow
      ? this.enterpriseCloudDatabaseService
        .updateMaintenanceWindow(this.clusterDetails.id, maintenanceWindow)
      : this.enterpriseCloudDatabaseService
        .createMaintenanceWindow(this.clusterDetails.id, maintenanceWindow));
  }
}
