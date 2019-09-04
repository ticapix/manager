import controller from './default-payment.controller';
import template from './default-payment.html';

const component = {
  bindings: {
    defaultPayment: '<',
    onChange: '&',
  },
  controller,
  template,
};

export default component;
