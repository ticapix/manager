import controller from './manual-backup.controller';
import template from './manual-backup.html';

const component = {
  bindings: {
    defaultPaymentMethod: '<',
  },
  controller,
  template,
};

export default component;
