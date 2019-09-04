import controller from './restore.controller';
import template from './restore.html';

const component = {
  bindings: {
    backupInstacnce: '<',
    defaultPaymentMethod: '<',
    goBackToBackups: '<',
  },
  controller,
  template,
};

export default component;
