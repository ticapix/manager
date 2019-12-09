import controller from './pack-move-offer.controller';
import template from './pack-move-offer.html';

export default {
  bindings: {
    offerModel: '=?',
    offer: '=?',
    change: '&',
  },
  controller,
  template,
};
