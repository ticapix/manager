import controller from './hosting-cdn-order.controller';
import template from './hosting-cdn-order.html';

export default {
  controller,
  template,
  bindings: {
    autoPayWithPreferredPaymentMethod: '<',
    catalogAddon: '<',
    checkoutOrderCart: '<',
    goBack: '<',
    goBackWithError: '<',
    isOptionFree: '<',
    prepareOrderCart: '<',
    serviceName: '<',
    serviceOption: '<',
    user: '<',
  },
};
