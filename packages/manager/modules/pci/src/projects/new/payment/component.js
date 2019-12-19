import controller from './controller';
import template from './index.html';

export default {
  name: 'pciProjectNewPayment',
  controller,
  template,
  bindings: {
    cart: '<',
    getCancelHref: '<',
    eligibility: '<',
    model: '<',
  },
};
