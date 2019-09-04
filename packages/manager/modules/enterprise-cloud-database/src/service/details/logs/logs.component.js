import template from './logs.html';
import controller from './logs.controller';

export default {
  bindings: {
    clusterId: '<',
    logs: '<',
    grantAccess: '<',
    revokeAccess: '<',
  },
  controller,
  template,
};
