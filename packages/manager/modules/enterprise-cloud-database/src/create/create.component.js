import controller from './create.controller';
import template from './create.html';

export default {
  bindings: {
    capabilities: '<',
    catalog: '<',
    user: '<',
  },
  controller,
  template,
};
