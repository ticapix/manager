import template from './enterprise-cloud-database.html';
import controller from './enterprise-cloud-database.controller';

export default {
  bindings: {
    clusters: '<',
    capabilities: '<',
    getClusterDetails: '<',
  },
  controller,
  template,
};
