import template from './backups.html';
import controller from './backups.controller';

export default {
  bindings: {
    backupList: '<',
    backupPrice: '<',
    clusterDetails: '<',
    defaultPaymentMethod: '<',
    getBackupDetails: '<',
    restorePrice: '<',
    user: '<',
  },
  controller,
  template,
};
