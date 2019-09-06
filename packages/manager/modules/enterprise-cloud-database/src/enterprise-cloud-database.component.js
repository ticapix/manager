import template from './enterprise-cloud-database.html';
import controller from './enterprise-cloud-database.controller';

export default {
  bindings: {
    clusters: '<',
    getClusterDetails: '<',
  },
  controller,
  template,
};
