import controller from './price.controller';
import template from './price.html';

const component = {
  bindings: {
    price: '<',
    tax: '<',
  },
  controller,
  template,
};

export default component;
