import controller from './choose-cluster-config.controller';
import template from './choose-cluster-config.html';

export default {
  bindings: {
    clusters: '<',
    enterpriceDb: '<',
    onChange: '&',
  },
  controller,
  template,
};
