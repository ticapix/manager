import template from './settings.html';
import controller from './settings.controller';

export default {
  bindings: {
    clusterDetails: '<',
    maintenanceWindow: '<',
  },
  controller,
  template,
};
