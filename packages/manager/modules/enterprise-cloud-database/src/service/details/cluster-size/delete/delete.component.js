import controller from './delete.controller';
import template from './delete.html';

const component = {
  template,
  controller,
  bindings: {
    goBackToClusterSize: '<',
    hosts: '<',
  },
};

export default component;
