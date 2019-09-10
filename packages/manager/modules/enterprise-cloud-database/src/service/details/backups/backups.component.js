import template from './backups.html';
import controller from './backups.controller';

export default {
  bindings: {
    clusterId: '<',
    backupList: '<',
    backupCatalog: '<',
    getBackupDetails: '<',
    defaultPaymentMethod: '<',
  },
  controller,
  template,
};
