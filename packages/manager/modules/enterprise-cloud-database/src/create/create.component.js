import controller from './create.controller';
import template from './create.html';

export default {
  bindings: {
    capabilities: '<',
    catalog: '<',
    hasDefaultPaymentMethod: '<',
    paymentMethodURL: '<',
    goBackToList: '<',
    user: '<',
  },
  controller,
  template,
};
