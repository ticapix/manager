import template from './backups.html';
import controller from './backups.controller';

export default {
  bindings: {
    clusterDetails: '<',
    backupList: '<',
    backupPrice: '<',
    getBackupDetails: '<',
    defaultPaymentMethod: '<',
    restorePrice: '<',
  },
  controller,
  template,
};
