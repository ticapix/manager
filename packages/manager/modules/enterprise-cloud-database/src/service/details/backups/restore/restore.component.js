import controller from './restore.controller';
import template from './restore.html';

const component = {
  bindings: {
    backupInstance: '<',
    defaultPaymentMethod: '<',
    goBackToBackups: '<',
    restorePrice: '<',
  },
  controller,
  template,
};

export default component;
