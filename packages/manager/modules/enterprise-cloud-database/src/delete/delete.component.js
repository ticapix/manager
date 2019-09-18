import controller from './delete.controller';
import template from './delete.html';

const component = {
  bindings: {
    clusterName: '<',
    goBack: '<',
  },
  controller,
  template,
};

export default component;
