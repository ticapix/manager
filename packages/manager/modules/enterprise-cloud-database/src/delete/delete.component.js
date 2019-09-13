import controller from './delete.controller';
import template from './delete.html';

const component = {
  bindings: {
    goBack: '<',
  },
  controller,
  template,
};

export default component;
