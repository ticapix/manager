import controller from './add-replicas.controller';
import template from './add-replicas.html';

const component = {
  template,
  controller,
  bindings: {
    callback: '<',
    defaultPaymentMethod: '<',
    hostList: '<',
    goBack: '<',
    hostList: '<',
    maxHostCount: '<',
  },
};

export default component;
