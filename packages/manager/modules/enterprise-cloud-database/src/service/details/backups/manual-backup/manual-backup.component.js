import controller from './manual-backup.controller';
import template from './manual-backup.html';

const component = {
  bindings: {
    clusterId: '<',
    defaultPaymentMethod: '<',
    goBackToBackups: '<',
  },
  controller,
  template,
};

export default component;
