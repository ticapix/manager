import set from 'lodash/set';

export default class {
  /* @ngInject */
  constructor(
    $q,
    $state,
    $stateParams,
    $translate,
    CucCloudMessage,
    OvhApiCloudProjectRegionWorkflowBackup,
    OvhApiCloudProjectInstance,
  ) {
    this.$q = $q;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$translate = $translate;
    this.CucCloudMessage = CucCloudMessage;
    this.OvhApiCloudProjectRegionWorkflowBackup = OvhApiCloudProjectRegionWorkflowBackup;
    this.OvhApiCloudProjectInstance = OvhApiCloudProjectInstance;
  }

  $onInit() {
    this.loadMessages();
    this.selectedWorkflowId = this.$stateParams.workflowId;
  }

  loadMessages() {
    this.CucCloudMessage.unSubscribe('pci.projects.project.workflow');
    this.messageHandler = this.CucCloudMessage.subscribe('pci.projects.project.workflow', { onMessage: () => this.refreshMessages() });
  }

  refreshMessages() {
    this.messages = this.messageHandler.getMessages();
  }

  getInstance(workflow) {
    return this.OvhApiCloudProjectInstance.v6().get({
      serviceName: this.projectId,
      instanceId: workflow.instanceId,
    }).$promise
      .then((instance) => {
        set(workflow, 'instanceName', instance.name);
        return workflow;
      });
  }

  selectWorkflow(workflow) {
    this.selectedWorkflowId = workflow.id;
    this.goToExecutionsPage(workflow);
  }

  goToInstancePage(instanceId) {
    this.$state.go('pci.projects.project.instances.instance', {
      projectId: this.projectId,
      instanceId,
    });
  }

  goToExecutionsPage(workflow) {
    this.$state.go('pci.projects.project.workflow.executions', {
      projectId: this.projectId,
      workflowId: workflow.id,
      workflow,
    });
  }

  deleteWorkflow(workflow) {
    this.selectedWorkflowId = null;
    this.$state.go('pci.projects.project.workflow.delete', {
      projectId: this.projectId,
      workflowId: workflow.id,
      workflow,
    });
  }
}
