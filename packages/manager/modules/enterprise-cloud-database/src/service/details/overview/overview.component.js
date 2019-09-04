import template from './overview.html';
import controller from './overview.controller';

export default {
  bindings: {
    clusterDetails: '<',
    clusterType: '<',
    endPoints: '<',
    goToClusterSize: '<',
    goToSettings: '<',
    goToUpdatePassword: '<',
    serviceInfo: '<',
    hosts: '<',
  },
  controller,
  template,
};
