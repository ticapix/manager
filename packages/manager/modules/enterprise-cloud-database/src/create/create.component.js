import template from './create.html';
import controller from './create.controller';

export default {
  bindings: {
    capabilities: '<',
    catalog: '<',
  },
  controller,
  template,
};
