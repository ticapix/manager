import controller from './pack-move-eligibility-address.controller';
import template from './pack-move-eligibility-address.html';

export default {
  bindings: {
    address: '=?',
    offersChange: '&',
    submited: '&',
    method: '=?',
  },
  template,
  controller,
};
