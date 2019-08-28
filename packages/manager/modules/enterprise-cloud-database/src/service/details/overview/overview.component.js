import template from './overview.html';
import controller from './overview.controller';

export default {
  bindings: {
    clusterDetails: '<',
    clusterType: '<',
    endPoints: '<',
    serviceInfo: '<',
    hosts: '<',
  },
  controller,
  template,
};
