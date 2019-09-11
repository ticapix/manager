import controller from './recovery.controller';
import template from './recovery.html';

const component = {
  bindings: {
    clusterId: '<',
    backupPrice: '<',
    defaultPaymentMethod: '<',
    goBackToBackups: '<',
    minDate: '<',
  },
  controller,
  template,
};

export default component;
