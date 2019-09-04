import controller from './delete.controller';
import template from './delete.html';

const component = {
  bindings: {
    instanceId: '<',
  },
  controller,
  template,
};

export default component;
