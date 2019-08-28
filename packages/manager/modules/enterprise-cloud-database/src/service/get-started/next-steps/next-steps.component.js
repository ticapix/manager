import controller from './next-steps.controller';
import template from './next-steps.html';

export default {
  template,
  controller,
  bindings: {
    addReplicas: '&',
    clusterDetails: '<',
    clusterType: '<',
    endPoints: '<',
    hostList: '<',
    maintenanceWindow: '<',
    onDataChange: '&',
    replicaConfig: '<',
  },
};
