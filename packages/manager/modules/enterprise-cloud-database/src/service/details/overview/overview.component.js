import template from './overview.html';
import controller from './overview.controller';

export default {
  bindings: {
    clusterDetails: '<',
    clusterType: '<',
    endPoints: '<',
    goToChangeName: '<',
    goToClusterSize: '<',
    goToSettings: '<',
    goToUpdatePassword: '<',
    hosts: '<',
    offerDetails: '<',
    serviceInfo: '<',
  },
  controller,
  template,
};
