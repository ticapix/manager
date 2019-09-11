import controller from './manual-backup.controller';
import template from './manual-backup.html';

const component = {
  bindings: {
    clusterId: '<',
    backupPrice: '<',
    defaultPaymentMethod: '<',
    goBackToBackups: '<',
  },
  controller,
  template,
};

export default component;
