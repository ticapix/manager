import controller from './controller';
import template from './index.html';

export default {
  name: 'pciProjectCreating',
  controller,
  template,
  bindings: {
    guideUrl: '<',
    onProjectDelivered: '<',
    orderId: '<',
    orderStatus: '<',
  },
};
