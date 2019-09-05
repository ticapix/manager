import template from './overview.html';
import controller from './overview.controller';

export default {
  bindings: {
    clusterDetails: '<',
    clusterType: '<',
    endPoints: '<',
    hosts: '<',
    goToClusterSize: '<',
    goToSettings: '<',
    goToUpdatePassword: '<',
    offerDetails: '<',
    serviceInfo: '<',
  },
  controller,
  template,
};
