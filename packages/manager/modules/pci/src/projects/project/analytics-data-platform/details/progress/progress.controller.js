import find from 'lodash/find';
import reduce from 'lodash/reduce';
import sumBy from 'lodash/sumBy';

import {
  ANALYTICS_DATA_PLATFORM_STATUS_MAP,
  ANALYTICS_DATA_PLATFORM_STATUS,
} from '../../analytics-data-platform.constants';

export default class {
  /* @ngInject */
  constructor(analyticsDataPlatformService, CucControllerHelper,
    CucCloudMessage, CucServiceHelper, CucCloudPoll) {
    this.CucCloudPoll = CucCloudPoll;
    this.analyticsDataPlatformService = analyticsDataPlatformService;
    this.ANALYTICS_DATA_PLATFORM_STATUS_MAP = ANALYTICS_DATA_PLATFORM_STATUS_MAP;
    this.ANALYTICS_DATA_PLATFORM_STATUS = ANALYTICS_DATA_PLATFORM_STATUS;
    this.cucControllerHelper = CucControllerHelper;
    this.cucServiceHelper = CucServiceHelper;
    this.cucCloudMessage = CucCloudMessage;
    this.globalProgress = 0;
  }

  $onInit() {
    this.calculateGlobalProgress(this.progress);
    this.handleOperation(this.serviceName);
    this.subscribeToMessages();
  }

  refreshMessage() {
    this.messages = this.messageHandler.getMessages();
  }

  subscribeToMessages() {
    this.cucCloudMessage.unSubscribe('pci.projects.project.analytics-data-platform.details.progress');
    this.messageHandler = this.cucCloudMessage.subscribe(
      'pci.projects.project.analytics-data-platform.details.progress',
      { onMessage: () => this.refreshMessage() },
    );
  }

  getProgress(serviceName) {
    return this.analyticsDataPlatformService
      .getStatus(serviceName)
      .then((tasks) => {
        this.calculateGlobalProgress(tasks);
        this.progress = tasks;
        return tasks;
      })
      .catch(error => this.cucServiceHelper.errorHandler('analytics_data_platform_tracking_progress_get_status_error')(error));
  }

  /**
   * Calculate global progress based on individual task progress
   *
   */
  calculateGlobalProgress(tasks) {
    if (tasks.length) {
      const totalPercentage = sumBy(tasks, 'percentage');
      this.globalProgress = Math.floor(totalPercentage / tasks.length);
    } else {
      this.globalProgress = 0;
    }
  }

  /**
   * Polls progress API untill it returns success or failure
   *
   */
  pollOperation(serviceName) {
    return this.CucCloudPoll.poll({
      item: { id: serviceName },
      pollFunction: () => this.getProgress(serviceName),
      stopCondition: () => this.progress.length && !find(
        this.progress,
        task => this.analyticsDataPlatformService.isDeploymentInProgress(task),
      ),
      interval: 60000,
    });
  }

  /**
   * handles checking status of cluster function.
   * Repeatedly polls for operation until it returns DEPLOYED message.
   *
   * @param {any} serviceName
   * @returns promise which will be resolved to operation object
   */
  handleOperation(serviceName) {
    return this.pollOperation(serviceName)
      .$promise
      .then(() => {
        const deploymentSuccessful = reduce(
          this.progress,
          (deploySuccessful, task) => deploySuccessful
            && (task.status === ANALYTICS_DATA_PLATFORM_STATUS.SUCCEEDED),
          true,
        );
        return (deploymentSuccessful
          ? this.goToServicePage(serviceName)
          : this.cucServiceHelper.errorHandler('analytics_data_platform_tracking_progress_deploy_error')()
        );
      });
  }
}
