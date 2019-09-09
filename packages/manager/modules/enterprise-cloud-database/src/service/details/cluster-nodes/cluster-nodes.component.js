import template from './cluster-nodes.html';
import controller from './cluster-nodes.controller';

export default {
  bindings: {
    addReplicas: '<',
    deleteReplicas: '<',
    hosts: '<',
    planCatalog: '<',
  },
  controller,
  template,
};
