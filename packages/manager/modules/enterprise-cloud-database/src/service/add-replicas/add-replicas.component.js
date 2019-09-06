import controller from './add-replicas.controller';
import template from './add-replicas.html';

const component = {
  template,
  controller,
  bindings: {
    callback: '<',
    currency: '<',
    defaultPaymentMethod: '<',
    hostList: '<',
    goBack: '<',
    maxHostCount: '<',
    nodeCatalog: '<',
  },
};

export default component;
