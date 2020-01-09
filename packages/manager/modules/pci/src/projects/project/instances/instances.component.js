import controller from './instances.controller';
import template from './instances.html';

export default {
  controller,
  template,
  bindings: {
    addInstance: '<',
    betaWarning: '<',
    createBackupInstance: '<',
    deleteInstance: '<',
    editInstance: '<',
    enableMonthlyBillingInstance: '<',
    endRescueInstance: '<',
    guideUrl: '<',
    hardRebootInstance: '<',
    help: '<',
    instanceLink: '<',
    instances: '<',
    projectId: '<',
    reinstallInstance: '<',
    resumeInstance: '<',
    scheduleAutoBackup: '<',
    softRebootInstance: '<',
    startRescueInstance: '<',
    viewInstance: '<',
    vrack: '<',
    vrackLink: '<',
  },
};
