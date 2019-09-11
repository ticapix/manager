import template from './create.html';
import controller from './create.controller';

export default {
  bindings: {
    capabilities: '<',
    catalog: '<',
    user: '<',
  },
  controller,
  template,
};
