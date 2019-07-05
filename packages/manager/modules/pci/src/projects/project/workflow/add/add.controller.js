import get from 'lodash/get';

export default class {
  /* @ngInject */
  constructor(
    $translate,
    $window,
    CucCloudMessage,
    PciProjectsProjectInstanceService,
    OvhApiCloudProjectRegionWorkflowBackup,
  ) {
    this.$translate = $translate;
    this.$window = $window;
    this.CucCloudMessage = CucCloudMessage;
    this.PciProjectsProjectInstanceService = PciProjectsProjectInstanceService;
    this.OvhApiCloudProjectRegionWorkflowBackup = OvhApiCloudProjectRegionWorkflowBackup;
    this.workflow = {
      type: null,
      resource: null,
      schedule: null,
      name: null,
    };
    this.price = null;
    this.isAdding = false;
    this.isLoadingPriceEstimate = false;
  }

  $onInit() {
    if (this.selectedInstance) {
      this.workflow.resource = this.selectedInstance;
    }
    this.loadMessages();
  }

  loadMessages() {
    this.CucCloudMessage.unSubscribe('pci.projects.project.workflow.new');
    this.messageHandler = this.CucCloudMessage.subscribe('pci.projects.project.workflow.new', { onMessage: () => this.refreshMessages() });
  }

  refreshMessages() {
    this.messages = this.messageHandler.getMessages();
  }

  getPriceEstimation() {
    this.isLoadingPriceEstimate = true;
    return this.PciProjectsProjectInstanceService
      .getBackupPriceEstimation(this.projectId, this.workflow.resource)
      .then((price) => {
        this.price = price;
        return price;
      })
      .finally(() => {
        this.isLoadingPriceEstimate = false;
      });
  }

  static getCronPattern(schedule) {
    return `${schedule.cronPattern.minutes} ${schedule.cronPattern.hour} ${schedule.cronPattern.dom} ${schedule.cronPattern.month} ${schedule.cronPattern.dow}`;
  }

  add() {
    this.isAdding = true;
    const workflow = {
      instanceId: this.workflow.resource.id,
      cron: this.constructor.getCronPattern(this.workflow.schedule),
      name: this.workflow.name,
      rotation: this.workflow.schedule.rotation,
    };
    if (this.workflow.schedule.maxExecutionCount) {
      workflow.maxExecutionCount = this.workflow.schedule.maxExecutionCount;
    }
    this.createBackupWorkflow(workflow, this.workflow.resource.region)
      .then(() => this.goToHomePage(
        this.$translate.instant('pci_workflow_add_success', { workflowName: workflow.name }),
      ))
      .catch((error) => {
        this.CucCloudMessage.error(
          this.$translate.instant('pci_workflow_add_error', {
            message: get(error, 'data.message'),
          }),
        );
        this.$window.scrollTo(0, 0);
      })
      .finally(() => {
        this.isAdding = false;
      });
  }

  createBackupWorkflow(workflow, regionName) {
    return this.OvhApiCloudProjectRegionWorkflowBackup.v6().save({
      serviceName: this.projectId,
      regionName,
    }, workflow).$promise;
  }
}
