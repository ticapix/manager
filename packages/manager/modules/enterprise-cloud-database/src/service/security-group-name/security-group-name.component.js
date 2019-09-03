import controller from './security-group-name.controller';
import template from './security-group-name.html';

const component = {
  template,
  bindings: {
    label: '<',
    onChange: '&',
    securityGroups: '<',
  },
  controller,
};

export default component;
