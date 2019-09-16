import template from './enterprise-cloud-database.html';
import controller from './enterprise-cloud-database.controller';

export default {
  bindings: {
    capabilities: '<',
    clusters: '<',
    createCluster: '<',
    deleteCluster: '<',
    getClusterDetails: '<',
    gettingStarted: '<',
    manageCluster: '<',
    user: '<',
  },
  controller,
  template,
};
