import controller from './controller';
import template from './index.html';

export default {
  name: 'pciProjectNewConfig',
  controller,
  template,
  bindings: {
    cart: '<',
    checkout: '<',
    getActionHref: '<',
    goToPayment: '<',
    model: '<',
  },
};
