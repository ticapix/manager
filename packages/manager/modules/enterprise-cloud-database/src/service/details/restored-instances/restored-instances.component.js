import template from './restored-instances.html';
import controller from './restored-instances.controller';

export default {
  bindings: {
    restoredInstances: '<',
    endpoints: '<',
    clusterId: '<',
  },
  controller,
  template,
};
