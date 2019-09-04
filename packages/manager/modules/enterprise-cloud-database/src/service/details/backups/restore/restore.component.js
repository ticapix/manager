import controller from './restore.controller';
import template from './restore.html';

const component = {
  bindings: {
    backupInstance: '<',
    defaultPaymentMethod: '<',
    goBackToBackups: '<',
  },
  controller,
  template,
};

export default component;
