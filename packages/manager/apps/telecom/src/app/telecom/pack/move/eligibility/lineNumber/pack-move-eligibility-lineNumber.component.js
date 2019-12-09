import controller from './pack-move-eligibility-lineNumber.controller';
import template from './pack-move-eligibility-lineNumber.html';

export default {
  bindings: {
    offers: '=?',
    offersChange: '&',
    submited: '&',
    method: '=?',
  },
  controller,
  template,
};
