import controller from './choose-database.controller';
import template from './choose-database.html';

export default {
  bindings: {
    enterpriseDb: '<',
    databases: '<',
    onChange: '&',
  },
  controller,
  template,
};
