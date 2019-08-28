import template from './cluster-size.html';
import controller from './cluster-size.controller';

export default {
  bindings: {
    addReplicas: '<',
    deleteReplicas: '<',
    hosts: '<',
  },
  controller,
  template,
};
