import controller from './account-size.controller';
import template from './account-size.html';

export default {
  bindings: {
    used: '<',
    total: '<',
  },
  controller,
  template,
};
