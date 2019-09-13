import controller from './recovery.controller';
import template from './recovery.html';

const component = {
  bindings: {
    backupPrice: '<',
    clusterId: '<',
    defaultPaymentMethod: '<',
    goBackToBackups: '<',
    minDate: '<',
    user: '<',
  },
  controller,
  template,
};

export default component;
