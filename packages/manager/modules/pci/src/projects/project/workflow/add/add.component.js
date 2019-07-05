import controller from './add.controller';
import template from './add.html';

export default {
  bindings: {
    projectId: '<',
    instances: '<',
    goToHomePage: '<',
    selectedInstance: '<',
  },
  controller,
  template,
};
