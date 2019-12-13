import template from './index.html';

export default {
  name: 'pciProjectNewConfig',
  template,
  bindings: {
    getActionHref: '<',
    goToPayment: '<',
    model: '<',
  },
};
