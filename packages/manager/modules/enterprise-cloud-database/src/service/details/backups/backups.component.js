import template from './backups.html';
import controller from './backups.controller';

export default {
  bindings: {
    clusterId: '<',
    backupList: '<',
    getBackupDetails: '<',
    defaultPaymentMethod: '<',
  },
  controller,
  template,
};
