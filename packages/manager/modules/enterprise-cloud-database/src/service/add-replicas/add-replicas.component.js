import controller from './add-replicas.controller';
import template from './add-replicas.html';

const component = {
  template,
  controller,
  bindings: {
    callback: '<',
    hostList: '<',
    goBack: '<',
  },
};

export default component;
