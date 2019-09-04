import controller from './recovery.controller';
import template from './recovery.html';

const component = {
  bindings: {
    defaultPaymentMethod: '<',
  },
  controller,
  template,
};

export default component;
