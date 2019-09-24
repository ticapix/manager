import template from './logs.html';
import controller from './logs.controller';

export default {
  bindings: {
    clusterId: '<',
    ldpHomeUrl: '<',
    logs: '<',
    grantAccess: '<',
    refreshLogs: '<',
    revokeAccess: '<',
  },
  controller,
  template,
};
