import template from './details.html';
import controller from './details.controller';

export default {
  bindings: {
    clusterDetails: '<',
    user: '<',
  },
  controller,
  template,
};
