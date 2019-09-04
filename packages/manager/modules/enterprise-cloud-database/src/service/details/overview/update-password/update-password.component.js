import controller from './update-password.controller';
import template from './update-password.html';

const component = {
  bindings: {
    clusterId: '<',
    goToOverview: '<',
  },
  controller,
  template,
};

export default component;
