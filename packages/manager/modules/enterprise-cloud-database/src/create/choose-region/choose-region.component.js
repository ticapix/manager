import controller from './choose-region.controller';
import template from './choose-region.html';

export default {
  bindings: {
    enterpriseDb: '<',
    regions: '<',
    onChange: '&',
  },
  controller,
  template,
};
